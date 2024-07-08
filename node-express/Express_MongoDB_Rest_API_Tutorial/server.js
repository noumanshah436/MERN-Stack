const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

// Whenever we need some data from the client (request body etc), we need to use a body parser, so that we can parse the stream of data we received from the client.
// So add this middleware for the json object which we got from the client as a request body.
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  console.log("App is running");
  res.json("Hello World!");
});

// error handling middleware (otherwise it show html page error)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
