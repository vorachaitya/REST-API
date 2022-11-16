const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//set up express app
const app = express();

//listen for requests
app.listen(process.env.port || 3000, function () {
  console.log("now listening for requests");
});

//connect to mongoDB
// mongoose.connect("mongodb://localhost/drivergo");
// mongoose.Promise = global.Promise;
dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.static("public"));

app.use(bodyParser.json());

//initialize routes
app.use("/api", require("./routes/api"));

//error handling middleware
app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});
