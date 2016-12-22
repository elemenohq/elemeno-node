# Elemeno

The official Node.js client for Elemeno, an API based CMS. Use this module to easily integrate your content created on Elemeno into your Node.js projects.

Create an account and get started for free at https://elemeno.io

## Requirements

- A minimum of Node.js 4.0.0

## Installation

`npm install elemeno`

## Documentation

Documentation is available at http://docs.elemeno.io

## Usage

```js
var Elemeno = require('elemeno');

var elemeno = new Elemeno('123e4567-e89b-12d3-a456-426655440000');

elemeno.getCollectionItems('recipes', function(err, response) {
	if (err) return console.log(err);

	// Do something with the response
	console.log(response);
});
```

## Caching

You have the option of caching API requests locally in memory by passing in cache options when creating your `elemeno` object. 

**Note:** The respone from the Elemeno API is also cached on Elemeno's servers for 2 minutes independent of the cache settings used on this client library. Please take this into consideration when configuring your local cache.

```js
var Elemeno = require('elemeno');

var options = {
	cacheMaxAge: 15 // minutes
}

var elemeno = new Elemeno('123e4567-e89b-12d3-a456-426655440000', options);
```

### Options:
| Property | Default      | Description                                                                                                                                                                                               |
|----------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cacheMaxAge   | 0 (disabled) | The maximum age of a cached response in minutes. After this time has elapsed, the next request will call the API and refresh the cached response                                                          |
| cacheSize     | 50           | The maximum amount of memory, in megabytes, used to store all of the cached items. Once this size is exceeded, the least used cache item will be dropped from the cache to make room for new cache items. |


## API Overview

### Singles

#### getSingles([options,] cb)

```js
elemeno.getSingles(
	{
		sort: {
	  		$dateUpdated: 'ASC'
		},
		page: 1,
		size: 20
	},
	function(err, response) {
		if (err) console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

#### getSingle(singleSlug, cb)

```js
elemeno.getSingle(
	'about',  // singleSlug
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

### Collections

#### getCollections([options,] cb)

```js
elemeno.getCollections(
	{
		sort: {
			$dateCreated: 'DESC'
		},
		page: 1,
		size: 20
	},
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

#### getCollection(collectionSlug, cb)

```js
elemeno.getCollection(
	'recipes',  // collectionSlug
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

#### getCollectionItems(collectionSlug, [options,] cb)

```js
elemeno.getCollectionItems(
	'recipes',  // collectionSlug
	{
		filters: {
			$title: {
				$contains: 'pie'
			}
		},
		sort: {
			$datePublished: 'DESC'
		},
		page: 1,
		size: 20
	},
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

#### getCollectionItem(collectionSlug, itemSlug, [options,] cb)

```js
elemeno.getCollectionItem(
	'recipes',    // collectionSlug
	'apple-pie',  // itemSlug
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

or `byId`:

```js
elemeno.getCollectionItem(
	'recipes',    // collectionSlug
	'765a1234-f34c-12d3-a456-562412381111',  // itemId
	{
		byId: true
	},
	function(err, response) {
		if (err) return console.log(err);

		// Do something with the response
		console.log(response);
	}
);
```

### Caching

#### clearCache()

```js 
elemeno.clearCache();
```
