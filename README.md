Please *Wait*, I *Promise* to Rid you of *Callback* Hell
========================================================

NodeJS development involves many tasks that 'block IO'.
Since NodeJS is single threaded, things can easily get bogged down by the following.

1. Filesystem calls
2. Database calls
3. HTTP calls
4. Lengthy calculations

Hence, asynchronous APIs (with callbacks) were developed to prevent blocking.

However, asynchronous code with *callbacks* is often difficult to maintain.
This can be mitigated by using the *promise* pattern, and then taking advantage of
the *async/await* keywords in ES7.

1. Look at the synchronous example.
2. Look at the asynchronous example with callbacks.
3. Look at the asynchronous example improved with promises.
4. Look at the asynchronous example improved with async/await.

All examples do the same following tasks.

1. Load a json file, as *fileContent*.
2. Parse the fileContent into a *jsonContent*.
3. For each element of *jsonContent*, perform an http call, 
   resulting in an *httpContent* array.
4. Store the *httpContent* in the database as *dbContent*.

There are potential errors in every step, and they are all handled.

To run the code, perform the following steps.

1. npm install
2. npm run build
3. node ./build/devcon2017-1.sync.js
4. node ./build/devcon2017-1.callback.js
5. node ./build/devcon2017-1.promise.js
6. node ./build/devcon2017-1.await.js
