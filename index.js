require('dotenv').config();
const algoliasearch = require('algoliasearch');
const _ = require('lodash');

const { ALGOLIA_ID, ALGOLIA_KEY, ALGOLIA_INDEX } = process.env;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const keywords = require('./keywords.js');
const data = _.map(keywords, (keyword) => ({
  keyword
}));
console.log(data);
