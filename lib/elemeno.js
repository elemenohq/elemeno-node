"use strict";

const crypto = require('crypto');
const LRU = require('lru-cache');
const request = require('superagent');
const sizeof = require('object-sizeof')

class Elemeno {

	constructor (apiKey, opts) {
		let defaults = {
			cache: {
				size: 50, // megabytes
				maxAge: 0 // minutes
			}
		};

		let options = Object.assign({}, defaults, opts);

		this.apiKey = apiKey;
		this.baseUrl = 'https://api.elemeno.io/v1/';
		this.singleBase = 'singles/';
		this.collectionBase = 'collections/';
		this.cache = null;

		if (options.cache && options.cache.maxAge) {
			this.cache = new LRU({
				max: options.cache.size * 1024 * 1024,    // bytes
				maxAge: options.cache.maxAge * 1000 * 60, // milliseconds
				length: function(item, key) {
					return sizeof(item) + sizeof(key);
				}
			});
		}
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

		let cacheKey;

		if (this.cache) {
			let identifier = JSON.stringify([path, query]);
			cacheKey = crypto.createHash('md5').update(identifier).digest('hex');

			let cachedItem = this.cache.get(cacheKey);

			if (cachedItem) {
				return cb(null, cachedItem);
			}
		}

		let req = request.get(this.baseUrl + path);

		req.set('Authorization', this.apiKey);

		if (query) {
			req.query(query)
		}

		req.end(function(err, res) {
			if (err) {
				return cb(err.response.error);
			}

			let item = res.body;

			if (this.cache) {
				this.cache.set(cacheKey, item);
			}

			cb(null, res.body);
		});
	}

	getSingles(options, cb) {
		if (typeof cb === 'undefined') {
			cb = options;
			options = null;
		}

		let path = this.singleBase;
		let query = Elemeno.getQuery(options, ['sort']);

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
		let query = Elemeno.getQuery(options);

		return this.get(path, query, cb);
	}

	clearCache() {
		if (this.cache) {
			this.cache.reset();
		}
	}
}

module.exports = Elemeno;
