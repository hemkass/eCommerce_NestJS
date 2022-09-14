// hello_algolia.js
const algoliasearch = require('algoliasearch');

// Connect and authenticate with your Algolia app
const client = algoliasearch(
  `${process.env.ALGOLIA_SEARCH}`,
  `${process.env.ALGOLIA_KEY}`
);

// Create a new index and add a record
const index = client.initIndex('dev_index');
const record = { objectID: 1, name: 'dev_index' };
index.saveObject(record).wait();

// Search the index and print the results
index.search('dev_index').then(({ hits }) => console.log(hits[0]));
