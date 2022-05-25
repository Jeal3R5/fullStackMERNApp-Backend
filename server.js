//Dependencies
//get .env variables
require("dotenv").config();
//pull port from .env give default 3001
const { PORT = 3001, DATABASE_URL } = process.env;
//import express
const express = require("express");
//create application object
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
//Database Connection
mongoose.connect(DATABASE_URL);

mongoose.connection
  .on("open", () => console.log("MongoDB Connected"))
  .on("close", () => console.log("Mongoose Disconnected"))
  .on("error", (error) => console.log(error));

//Model
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String,
});

const People = mongoose.model("People", PeopleSchema);

//Middleware
app.use(cors);
app.use(morgan("dev"));
app.use(express.json());

//ROUTES

app.get("/", (req, res) => {
  res.send("hello world");
});

//INDUCES   CRUD

//INDEX
app.get("/people", async (req, res) => {
  try {
    res.json(await People.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

//DELETE
app.delete("/people/:id", async (req, res) => {
  try {
    res.json(await People.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

//UPDATE
app.put("/people/:id", async (req, res) => {
  try {
    res.json(
      await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {}
});

//CREATE
app.post("/people", async (req, res) => {
  try {
    res.json(await People.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

//SHOW
app.get("/people/:id", async (req, res) => {
  try {
    res.json(await People.findById(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});




//Listener
app.listen(PORT, () => console.log(`They are listening on port ${PORT}`));
