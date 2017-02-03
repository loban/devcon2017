// NodeJS development involves many tasks that 'block io'
// Since NodeJS is single threaded, things can easily get bogged down by the following.
// 1. Filesystem calls
// 2. Database calls
// 3. HTTP calls
// 4. Lengthy calculations (simulated with timers)
// Hence, asynchronous api (with callbacks) is developed prevent blocking.
// Asynchronous code with callbacks is often difficult to maintain.
// Look at imaginary synchronous example
// Look at asynchronous example with callbacks. Handle all errors.
// Look at it improved with promises.
// Look at it improved with async/await.

// load a json file
// parse the fileContent, this can throw error
// foreach, do http call, some of them can fail
// for each value that comes, do some time-consuming computation
// after all calls are done, combine the values
// store the value in the database
