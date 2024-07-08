const { writeFileSync } = require('fs')
for (let i = 0; i < 10000; i++) {
  writeFileSync('./content/big.txt', `hello world ${i}\n`, { flag: 'a' })
}


// 3:25:51
// https://nodejs.org/api/fs.html
