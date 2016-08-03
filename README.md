# Elemeno

## Installation

`npm install elemeno`

## Documentation

Documentation is available at http://docs.elemeno.io

## API Overview

```js
var elemeno = require('elemeno');

// Set API Key
elemeno.setAPIKey('123e4567-e89b-12d3-a456-426655440000');
```

### Singles

#### `elemeno.getSingles([options,] cb)`

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

#### `elemeno.getSingle(singleSlug, cb)`

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

#### `elemeno.getCollections([options,] cb)`

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

#### `elemeno.getCollection(collectionSlug, cb)`

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

#### `elemeno.getCollectionItems(collectionSlug, [options,] cb)`

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

#### `elemeno.getCollectionItem(collectionSlug, itemSlug, [options,] cb)`

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
