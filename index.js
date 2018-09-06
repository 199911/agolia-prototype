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

const addObjects = () => {
  index.addObjects(data, function(err, content) {
    if (err) {
      console.error(err);
    } else {
      console.log(content);
    }
  });
}

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

const main = async () => {
  await searchAsync('一花生');
  await searchAsync('一生');
  await searchAsync('生花');
  await searchAsync('升派');
  await searchAsync('花生一地');
  await searchAsync('局及');
  await searchAsync('事務局及');
}

main();
// 生花: NULL
// 一花生: 一地花生
// 事務局及: 政制及內地事務局
// 一生: 三宅一生 高橋一生
// 升派: 升小派位 升中派位 直升機派錢
// 局及: 食物及衞生局 創新及科技局 運輸及房屋局 勞工及福利局 財經事務及庫務局 商務及經濟發展局 政制及內地事務局 美國國家海洋及大氣管理局
// 花生一地: 一地花生
