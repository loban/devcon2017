'use strict';

//
// Imports
//

const Fiber = require('fibers');

const colors = require('colors');
const fs = require('fs');
const request = require('sync-request');
const mongodb = require('mongo-sync');

//
// Main
//

function main() {
  console.log('-----------'.green);
  console.log('SYNCHRONOUS'.green);
  console.log('-----------'.green);

  console.time('SYNCHRONOUS'.yellow);
  Fiber(syncTask).run();
  console.timeEnd('SYNCHRONOUS'.yellow);
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
 * Synchronous
 */
function syncTask() {
  try {
    let fileContent = fs.readFileSync('links.json', 'utf-8');

    debug('fileContent', fileContent);

    let jsonContent = JSON.parse(fileContent);

    debug('jsonContent', jsonContent);

    let httpContent = jsonContent.map(function (item) {
      debug('loading item', item);
      let httpResponse = request('GET', item).getBody('utf-8');
      return httpResponse.substr(0, 10);
    });

    debug('httpContent', httpContent);

    let dbServer = new mongodb.Server('127.0.0.1');
    let dbContent = dbServer.db('local').getCollection('values').insert({
      value: httpContent
    });

    debug('dbContent', dbContent.ops);
  }
  catch (anyError) {
    error('anyError', anyError);
  }
}
