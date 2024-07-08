const express = require("express");
const app = express();
const logger = require("./logger");
const authorize = require("./authorize");

// app.use(logger);
// this middleware will be applied to all the requests

// ******************

// app.use('/api',logger);
// If you also provide path as first argument, it will be applied to all the paths that starts with it only.
// api/home/about/products

// ******************

// multiple middlewares
app.use([logger, authorize]);

// ******************

// http://localhost:5000/?user=nouman

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});

// localhost:5000/api/items?user=nouman
http: app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

// add multiple middleware to single request
// http: app.get("/api/items", [logger, authorize], (req, res) => {
//   console.log(req.user);
//   res.send("Items");
// });

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

// 6:36:56
//
