// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods
// keep track of the order
// additional arguments
// built-in modules utilize it

customEmitter.on('response', (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`)
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'john', 34)    // this will emmit events


// on - listen for an event
// Adds the listener function to the end of the listeners array for the event named eventName

// emit - emit an event
// Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.
// Returns true if the event had listeners, false otherwise.
