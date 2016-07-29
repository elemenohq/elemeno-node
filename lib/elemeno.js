const request = require('superagent'),
  baseUrl = 'https://api.elemeno.io/v1/',
  singleBase = 'singles/',
  collectionBase = 'collections/';

var apiKey;

function get(path, query, cb) {
  request
  .get(baseUrl + path)
  .set('Authorization', apiKey)
  .query(query)
  .end(function(err, res) {
    return (err) ? cb(err.response.error) : cb(null, res.body);
  });
}

function getQuery(options, allow) {
  var query = {};

  if (options) {
    if (allow.indexOf('filters') > -1 && options.filters) {
      query.filters = JSON.stringify(options.filters);
    }
    if (allow.indexOf('sort') > -1 && options.sort) {
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