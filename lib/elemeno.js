const request = require('superagent'),
  baseUrl = 'https://api.elemeno.io/v1/',
  singleBase = 'singles/',
  collectionBase = 'collections/';

var apiKey;

function get(path, query, cb) {
  if (elemeno.caching.enabled) {
    var cacheValue = elemeno.caching.getValue(path + JSON.stringify(query));
    if (cacheValue !== null) {
      return cb(cacheValue);
    }
  }

  request
  .get(baseUrl + path)
  .set('Authorization', apiKey)
  .query(query)
  .end(function(err, res) {
    if (elemeno.caching.enabled && !err) elemeno.caching.setValue(path + JSON.stringify(query), res.body);

    return (err) ? cb(err.response.error) : cb(null, res.body);
  });
}

function getQuery(options, allow) {
  var query = {};

  if (options) {
    if (options.filters && Array.isArray(allow) && allow.indexOf('filters') > -1) {
      query.filters = JSON.stringify(options.filters);
    }
    if (options.sort && Array.isArray(allow) && allow.indexOf('sort') > -1) {
      query.sort = JSON.stringify(options.sort);
    }
    if (options.page) {
      query.page = options.page;
    }
    if (options.size) {
      query.size = options.size;
    }
    if (options.byId) {
      query.byId = (options.byId === true || options.byId === 'true') ? true : false;
    }
  }

  return query;
}

var elemeno = {};

elemeno.setAPIKey = function(key) {
  apiKey = key;
}

elemeno.enableCache = function(options) {
  this.caching.enable(options);
}

// Caching module
elemeno.caching = {
  // Utilities
  utils: {
    extend: function(destination, source) {
      for(key in source) {
        destination[key] = source[key] || destination[key];
      }
      return destination;
    }
  },

  // Variables
  enabled: false,
  options: {
    refreshTime: 15 * 60,
  },

  // Functions
  enable: function(options) {
    this.enabled = true;

    this.options = this.utils.extend(this.options, options);

    this.cache = require("memory-cache");
  },

  setRefreshTime: function(rT) {
    this.options.refreshTime = rT || this.options.refreshTime;
  },

  getValue: function(query) {
    return this.cache.get(query);
  },

  setValue: function(key, data) {
    this.cache.put(key, data, this.options.refreshTime * 1000);
  },

  clearCache: function() {
    this.cache.clear();
  }
};

// Singles
elemeno.getSingles = function(options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }

  return get(singleBase, getQuery(options, ['sort']), cb);
}

elemeno.getSingle = function(singleSlug, cb) {
  var options = {};

  return get(singleBase + singleSlug, getQuery(options), cb);
}

// Collections
elemeno.getCollections = function(options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }

  return get(collectionBase, getQuery(options, ['sort']), cb);
}

elemeno.getCollection = function(collectionSlug, cb) {
  var options = {};

  return get(collectionBase + collectionSlug, getQuery(options), cb);
}

elemeno.getCollectionItems = function(collectionSlug, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }

  return get(collectionBase + collectionSlug + '/items/', getQuery(options, ['filters', 'sort']), cb);
}

elemeno.getCollectionItem = function(collectionSlug, itemSlug, options, cb) {
  if (typeof cb === 'undefined') {
    cb = options;
    options = {};
  }

  return get(collectionBase + collectionSlug + '/items/' + itemSlug, getQuery(options), cb);
}

module.exports = elemeno;
