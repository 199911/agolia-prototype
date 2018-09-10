require('dotenv').config();
const algoliasearch = require('algoliasearch');
const _ = require('lodash');

const { ALGOLIA_ID, ALGOLIA_KEY, ALGOLIA_INDEX } = process.env;

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const searchAsync = (query) => {
  return index.search({
    query
    },
    function searchDone(err, content) {
      if (err) {
        console.error(err);
      } else {
        const keywords = _.map(content.hits, 'keyword');
        if (keywords.length > 0) {
          console.log(`${query}: ${keywords.join(' ')}`);
        } else {
          console.log(`${query}: NULL`);
        }
      }
    }
  );
}

index.exportSynonyms(100 /* hitsPerPage: 100 is default */, console.log /* callback */);

index.saveSynonym({
  type: 'synonym',
  synonyms: ['23', '廿三', '二十三']
}, { forwardToReplicas: true }, function(err, content) {
  if (err) {
    console.error(err);
  } else {
    console.log(content);
  }
});

searchAsync('23');
searchAsync('廿三');
