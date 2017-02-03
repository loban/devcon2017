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
function main() {
  console.log('--------------'.green);
  console.log('ASYNCHRONOUS-2'.green);
  console.log('--------------'.green);

  console.time('ASYNCHRONOUS-2'.yellow);
  asyncTask2()
    .then(() => {
      console.timeEnd('ASYNCHRONOUS-2'.yellow);
      process.exit();
    });
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
 * Asynchronous-2 using promises
 */
function asyncTask2() {
  return fs.readFileAsync('links.json', 'utf-8')
    .then(fileContent => {
      debug('fileContent', fileContent);

      return JSON.parse(fileContent);
    })
    .then(jsonContent => {
      debug('jsonContent', jsonContent);

      return Promise.all(jsonContent.map(function (item) {
        debug('loading item', item.url);
        return request.get(item.url)
          .then(httpResponse => {
            return httpResponse.substr(item.position, item.length);
          });
      }));
    })
    .then(httpContent => {
      debug('httpContent', httpContent);

      return mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/local')
        .then(db => {
          return db.collection('values').insertOne({
            value: httpContent
          });
        });
    })
    .then(dbContent => {
      debug('dbContent', dbContent.ops);
    })
    .catch(anyError => {
      error('anyError', anyError);
    });
}
