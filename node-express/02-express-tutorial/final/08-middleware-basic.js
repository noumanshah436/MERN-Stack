const express = require('express')
const app = express()

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // res.send('Testing')
  next();
}

app.get('/', logger, (req, res) => {
  console.log("GET method")
  res.send('Home')
})
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

// express middleware are functions that execute during the request to the server
// each middleware has access to the request and response object


// middleware is everywhere in express
// express apps are nothing but bunch of middleware functions stuffed togethor to make one nice express cake
