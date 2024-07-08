const express = require("express");
const app = express();
const { products } = require("./data");

app.get("/", (req, res) => {
  res.json(products);
});

app.get("/person", (req, res) => {
  res.json([
    { user: "Nouman", age: 23 },
    { user: "Farhan", age: 15 },
  ]);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

// https://expressjs.com/en/5x/api.html#res.json
// https://www.geeksforgeeks.org/express-js-res-json-function/

// The res.json() function sends a JSON response.
// This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.

// Syntax:
// res.json( [body] )

// res.json(null);
// res.json({ user: "tobi" });
// res.status(500).json({ error: "message" });
