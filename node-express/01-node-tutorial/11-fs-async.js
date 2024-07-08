const { readFile, writeFile } = require('fs')
// we are
// 1) read first.txt file and save its content in first var
// 2) read second.txt file and save its content in second var
// 2) read second.txt file and save its content in second var
//


// syntax
// readFile( file-to-read, encoding-type, callback-function )
// writeFile( file--where-to-write, content, callback-function )

console.log('start')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./content/second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './content/result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(`result: ${result}`)
        console.log('done with this task')
      }
    )
  })
})
console.log('starting next task')
