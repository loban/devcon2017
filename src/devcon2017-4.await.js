'use strict';

//
// Imports
//

const Promise = require('bluebird');

const colors = require('colors');
const fs = Promise.promisifyAll(require('fs'));
const request = require('request-promise');
const mongodb = require('mongodb');

//
// Main
//
async function main() {
  console.log('--------------'.green);
  console.log('ASYNCHRONOUS-3'.green);
  console.log('--------------'.green);

  console.time('ASYNCHRONOUS-3'.yellow);
  await asyncTask3();
  console.timeEnd('ASYNCHRONOUS-3'.yellow);
  process.exit();
}
main();

//
// Functions
//

/**
 * Utility
 */
function debug(label, dump) {
  return console.log(label.cyan, dump);
}
function error(label, dump) {
  return console.error(label.red, dump);
}

/**
 * Asynchronous-3 using async/await
 */
async function asyncTask3() {
  try {
    let fileContent = await fs.readFileAsync('links.json', 'utf-8');

    debug('fileContent', fileContent);

    let jsonContent = JSON.parse(fileContent);

    debug('jsonContent', jsonContent);

    let httpContent = await Promise.all(jsonContent.map(async item => {
      debug('loading item', item.url);
      let httpResponse = await request.get(item.url);
      return httpResponse.substr(item.position, item.length);
    }));

    debug('httpContent', httpContent);

    let db = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/local');
    let dbContent = await db.collection('values').insertOne({
      value: httpContent
    });

    debug('dbContent', dbContent.ops);
  }
  catch (anyError) {
    error('anyError', anyError);
  }
}
