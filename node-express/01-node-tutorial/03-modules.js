// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')

// here we just require module and behind the scene that module will do bunch of cool stuff
require('./07-mind-grenade')

console.log(data)
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
