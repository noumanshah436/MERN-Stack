const path = require('path')

console.log(path.sep)

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)

//      output:
//      /
//      /content/subfolder/test.txt
//      test.txt
//      /home/dev/MERN/node-express-course/01-node-tutorial/content/subfolder/test.txt
