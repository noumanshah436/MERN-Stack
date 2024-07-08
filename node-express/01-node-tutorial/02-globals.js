// - NO WINDOW !!!!
// window object, which is available in web browsers, is not available in Node.js. 

// ***********************************

// GLOBALS  
// Node.js provides its own set of global objects and modules that are useful for server-side development.

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

console.log(__dirname)
setInterval(() => {
  console.log('hello world')
}, 1000)
