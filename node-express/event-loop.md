The event loop is a core concept in Node.js that allows non-blocking, asynchronous operations. It enables Node.js to perform I/O operations (reading from a network, accessing a database, etc.) without blocking the main thread, which is crucial for handling a large number of concurrent operations efficiently.

### Key Points of the Event Loop:

1. **Single-Threaded**: Node.js operates on a single thread using an event-driven architecture, but it can handle many concurrent operations due to the event loop.

2. **Non-Blocking I/O**: Node.js uses non-blocking I/O calls, meaning that it can initiate an I/O operation and move on to other tasks without waiting for the I/O operation to complete. When the I/O operation completes, the event loop picks up the callback associated with the operation and executes it.

3. **Phases of the Event Loop**: The event loop consists of several phases, each handling different types of callbacks:
   - **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
   - **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
   - **Idle, Prepare**: Internal use only.
   - **Poll**: Retrieves new I/O events; executes I/O-related callbacks (excluding close callbacks, timers, and `setImmediate()`).
   - **Check**: Executes callbacks scheduled by `setImmediate()`.
   - **Close Callbacks**: Executes close event callbacks, such as `socket.on('close', ...)`.

4. **Callback Queue**: When an asynchronous operation completes, its callback is queued and executed in the appropriate phase of the event loop.

### Example of the Event Loop in Action:

```javascript
const fs = require('fs');

console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

fs.readFile('example.txt', (err, data) => {
    if (err) throw err;
    console.log('File read');
});

console.log('End');
```

Output:
```
Start
End
File read
Timeout
```

### Explanation:

1. **Start** and **End** are printed first because they are synchronous operations.
2. The `setTimeout()` callback is scheduled to run after 0 milliseconds, but it is not executed immediately because the event loop needs to complete the current phase.
3. `fs.readFile()` is an asynchronous operation. When the file is read, the callback is added to the queue and will be executed in the poll phase.
4. After the synchronous code is executed, the event loop picks up the I/O callback for `fs.readFile()` and executes it.
5. Finally, the `setTimeout()` callback is executed in the timers phase.

This demonstrates how Node.js can handle asynchronous operations without blocking the main thread, making it highly efficient for I/O-bound tasks.