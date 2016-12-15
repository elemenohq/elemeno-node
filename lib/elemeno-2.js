"use strict";

const request = require('superagent');

class Elemeno {

	constructor (apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = 'https://api.elemeno.io/v1/';
		this.singleBase = 'singles/';
		this.collectionBase = 'collections/';
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

	get(path, query, cb) {
		if (typeof cb === 'undefined') {
			cb = query;
			query = null;
		}

		let req = request.get(this.baseUrl + path);

		req.set('Authorization', this.apiKey);

		if (query) {
			req.query(query)
		}

		req.end(function(err, res) {
			return (err) ? cb(err.response.error) : cb(null, res.body);
		});
	}

	getSingles(options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = null;
		}

		let path = this.singleBase;
		let query = Elemeno.getQuery(options, ['sort'])

		return this.get(path, query, cb);
	}

	getSingle(singleSlug, cb) {
		let path = this.singleBase + singleSlug;

		return this.get(path, cb);
	}

	getCollections(options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = null;
		}

		let path = this.collectionBase;
		let query = Elemeno.getQuery(options, ['sort']);

		return this.get(path, query, cb);
	}

	getCollection(collectionSlug, cb) {
		let path = this.collectionBase + collectionSlug;

		return this.get(path, cb);
	}

	getCollectionItems(collectionSlug, options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = null;
		}

		let path = this.collectionBase + collectionSlug + '/items/';
		let query = Elemeno.getQuery(options, ['filters', 'sort']);

		return this.get(path, query, cb);
	}

	getCollectionItem(collectionSlug, itemSlug, options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = null;
		}

		let path = this.collectionBase + collectionSlug + '/items/' + itemSlug;
		let query = Elemeno.getQuery(options)

		return this.get(path, query, cb);
	}
}

module.exports = Elemeno;
