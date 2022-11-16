const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
const port = 3000;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
app.use(express.json());
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));

app.get("/users", async (req, res) => { //API to get all the stored users in mongoDB
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res) => { // API to create an user
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    ispaymentmade: false,
    totalearningmade: 0,
    refuser: null,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put("/users/:id", getUser, async (req, res) => { // api to update user
  console.log(req.body);
  res.user.refuser == req.body.refuser  //set refuser to request's refuser
  res.user.ispaymentmade = true  
  res.user.totalearningmade =  (res.user.totalearningmade) + 10
  try {
   const updatedUser = await res.user.save()
   res.json(updatedUser)
   console.log(updatedUser)
} catch (error) {
   res.status(400).json({message: error.message})
  }
});

async function getUser(req, res, next) { // finding user
  let user
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
  res.user = user
  next()
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
