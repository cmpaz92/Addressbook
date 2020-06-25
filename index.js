const express = require("express");
const bodyParser = require("body-parser");
const user = require("./api/user/route/user");
const friends = require("./api/user/route/friends");
const InitiateMongoServer = require("./config/db");

var cors = require('cors')


// Initiate Mongo Server
InitiateMongoServer();

const app = express();
app.use(cors())
// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/friends", friends);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});