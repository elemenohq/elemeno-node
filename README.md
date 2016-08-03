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
  function(err, singles) {
    if (err) console.log(err);

    // Do something with the singles
    console.log(singles);
  }
);
```

#### `elemeno.getSingle(singleSlug, cb)`

```js
elemeno.getSingle(
  'about',  // singleSlug
  function(err, single) {
    if (err) return console.log(err);

    // Do something with the single
    console.log(single);
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
  function(err, collections) {
    if (err) return console.log(err);

    // Do something with the collections
    console.log(collections);
  }
);
```

#### `elemeno.getCollection(collectionSlug, cb)`

```js
elemeno.getCollection(
  'recipes',  // collectionSlug
  function(err, collection) {
    if (err) return console.log(err);

    // Do something with the collection
    console.log(collection);
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
  function(err, items) {
    if (err) return console.log(err);

    // Do something with the items
    console.log(items);
  }
);
```

#### `elemeno.getCollectionItem(collectionSlug, itemSlug, [options,] cb)`

```js
elemeno.getCollectionItem(
  'recipes',    // collectionSlug
  'apple-pie',  // itemSlug
  function(err, item) {
    if (err) return console.log(err);

    // Do something with the item
    console.log(item);
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
  function(err, item) {
    if (err) return console.log(err);

    // Do something with the item
    console.log(item);
  }
);
```