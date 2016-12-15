"use strict";

const request = require('superagent');

class Elemeno {

	constructor (apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = 'https://api.elemeno.io/v1/';
		this.singleBase = 'singles/';
		this.collectionBase = 'collections/';
  	}

  	static get(path, query, cb) {
		request
		.get(this.baseUrl + path)
		.set('Authorization', this.apiKey)
		.query(query)
		.end(function(err, res) {
			return (err) ? cb(err.response.error) : cb(null, res.body);
		});
	}

	static getQuery(options, allow) {
		let query = {};

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

	getSingles(options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = {};
		}

		return get(this.singleBase, this.getQuery(options, ['sort']), cb);
	}

	getSingle(singleSlug, cb) {
		var options = {};

		return get(this.singleBase + singleSlug, this.getQuery(options), cb);
	}

	getCollections(options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = {};
		}

		return get(this.collectionBase, this.getQuery(options, ['sort']), cb);
	}

	getCollection(collectionSlug, cb) {
		var options = {};

		return get(this.collectionBase + collectionSlug, this.getQuery(options), cb);
	}

	getCollectionItems(collectionSlug, options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = {};
		}

		return get(this.collectionBase + collectionSlug + '/items/', this.getQuery(options, ['filters', 'sort']), cb);
	}

	getCollectionItem(collectionSlug, itemSlug, options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = {};
		}

		return get(this.collectionBase + collectionSlug + '/items/' + itemSlug, this.getQuery(options), cb);
	}
}

module.exports = Elemeno;
