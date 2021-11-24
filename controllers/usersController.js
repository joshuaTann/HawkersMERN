const express = require("express");
const router = express.Router();
const seedUsers = require("../seedData/seedUsers");
const Hawkers = require("../models/hawkers");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

//! SEED

router.get("/seed", async (req, res) => {
  await Users.deleteMany({});
  // console.log(seedUsers);

  seedUsers.forEach((user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });

  const seededUsers = await Users.create(seedUsers);

  res.json(seededUsers);
});

//! INDEX

router.get("/", async (req, res) => {
  const allUsers = await Users.find({});

  res.json(allUsers);
});

//! SHOW

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const thisUser = await Users.findById(id).populate("stalls").populate("favourites");

  res.json(thisUser);
});

//! CREATE

router.post("/new", async (req, res) => {
  const newUserData = req.body;

  // find db for the inserted username, to see if already exists
  const checkDuplicate = await Users.find({ username: newUserData.username });

  // if there ISN'T, then we can create
  if (checkDuplicate.length < 1) {
    newUserData.password = bcrypt.hashSync(
      newUserData.password,
      bcrypt.genSaltSync(10)
    );

    const newUser = await Users.create(newUserData);

    console.log(newUser);
    res.json("Success");
  }
  // Username in use!
  else {
    res.json("This username is already in use");
  }
});

//!ADDING A FAVOURITE
router.put("/:id/:hawker", async (req, res) => {
  const { id, hawker } = req.params;
  console.log(id, hawker)
  const updated = await Users.findByIdAndUpdate(id, { $push: { favourites: hawker } })
  res.status(200).json(updated);
});

//! UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  const updatedUser = await Users.findByIdAndUpdate(id, updatedUserData);
  console.log(updatedUser);
  res.status(200).json(updatedUser);
});


//!REMOVING A FAVOURITE
router.delete("/:id/:hawker", async (req, res) => {
  const { id, hawker } = req.params;
  console.log(id, hawker)
  const updated = await Users.findByIdAndUpdate(id, { $pull: { favourites: hawker } })
  res.status(200).json(updated);
});


//! DESTROY
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("at backend, ID is:", id);
  const deletedItem = await Users.findByIdAndDelete(id, (err, deleted) => {
    if (err) {
      console.log(err);
    } else {
      console.log(deleted);
      res.json(deleted);
    }
  });
  console.log(deletedItem);
});




module.exports = router;
