//Dependencies
//get .env variables
require("dotenv").config();
//pull port from .env give default 3001
const PORT = process.env.PORT || 3001;
//import express
const express = require("express");
//create application object
const app = express();

//ROUTES

app.get("/", (req, res) => {
  res.send("hello world");
});

//Listener
app.listen(PORT, () => console.log(`They are listening on port ${PORT}`));
