'use strict';

//
// Imports
//

const colors = require('colors');
const fs = require('fs');
const request = require('request');
const mongodb = require('mongodb');

//
// Main
//

function main() {
    console.log('--------------'.green);
    console.log('ASYNCHRONOUS-1'.green);
    console.log('--------------'.green);

    console.time('ASYNCHRONOUS-1'.yellow);
    asyncTask1(function () {
        console.timeEnd('ASYNCHRONOUS-1'.yellow);
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
 * Asynchronous-1 using callbacks
 */
function asyncTask1(callback) {
    fs.readFile('links.json', 'utf-8', function (fileError, fileContent) {
        if (fileError) {
            error('fileError', fileError);
            return callback();
        }
        debug('fileContent', fileContent);

        let jsonContent;
        try {
            jsonContent = JSON.parse(fileContent);
        }
        catch (syntaxError) {
            error('syntaxError', syntaxError);
            return callback();
        }
        debug('jsonContent', jsonContent);

        let httpContent = [];
        let count = 0;
        jsonContent.forEach(function (item) {
            debug('loading item', item);
            request.get(item, function (httpError, httpResponse, httpBody) {
                if (httpError) {
                    error('httpError', httpError);
                    return callback();
                }
                httpContent.push(httpBody.substr(0, 10));
                count++;

                if (count == jsonContent.length) {
                    debug('httpContent', httpContent);

                    mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/local', function (dbError, db) {
                        if (dbError) {
                            error('dbError', dbError);
                            return callback();
                        }
                        db.collection('values').insertOne({value: httpContent}, function (dbError, dbContent) {
                            if (dbError) {
                                error('dbError', dbError);
                                return callback();
                            }
                            debug('dbContent', dbContent.ops);
                            return callback();
                        })
                    });
                }
            });
        });
    });
}
