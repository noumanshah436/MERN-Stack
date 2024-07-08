setInterval(() => {
  console.log('hello world')
}, 2000)
console.log(`I will run first`)
// process stays alive unless
// Kill Process CONTROL + C
// unexpected error


// for every 2 sec, event loop will invoke that callback
