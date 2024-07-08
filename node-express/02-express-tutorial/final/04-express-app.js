const express = require('express')
const path = require('path')

const app = express()

// app.use is used to set up the middlewares.
// setup static and middleware
// express.static is a builtin middleware
app.use(express.static('./public'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
  res.status(404).send('resource not found')
})

app.listen(5000, () => {
  console.log('server is listening on port 5000....')
})


// Static assets:

// If we have static assets that does not change,
// we can place them in folder and register it using express.static middleware.
// Now express will takes care of all these static assets
//  ( No need to create path like we do before using http module)
//  Express will set up the paths, mime types and the status codes.
// we can assess them also:
// http://localhost:5000/styles.css
