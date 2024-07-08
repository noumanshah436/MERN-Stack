const { readFile, writeFile } = require("fs");

console.log("started a first task");
// CHECK FILE PATH!!!!
readFile("./content/first.txt", "utf8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(result);
  console.log("completed first task");
});
console.log("starting next task");

// run using nodemon from the root path
// nodemon 1-event-loop-examples/1-read-file.js

// as readfile is asynchronous, event loop will offload it
// node run the readfile statement and after it completes execution of the remaining code, it will execute the callback
