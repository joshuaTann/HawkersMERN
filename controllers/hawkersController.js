const express = require("express");
const router = express.Router();
const seedHawkers = require("../seedData/seedHawkers");
const Hawkers = require("../models/hawkers");
const Users = require("../models/users");



//! SEED

router.get("/seed", async (req, res) => {
  await Hawkers.deleteMany({});
  console.log(seedHawkers);
  const seededHawkers = await Hawkers.create(seedHawkers);

  res.json(seededHawkers);
})

//! INDEX

router.get("/", async (req, res) => {
  const allHawkers = await Hawkers.find({});

  res.json(allHawkers);
})


//! SHOW
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const thisCar = await Hawkers.findById(id).populate("owner");
  res.json(thisCar);
})

//! CREATE 
router.post("/new", async (req, res) => {
  try{
  const id = req.body.owner
  console.log("Stall owner ID", id)
  console.log(req.body)
  // const hawker = await new Hawkers(req.body);
  // hawker.save();
  const hawker = await Hawkers.create(req.body);
  const hawkerID = await Hawkers.find(req.body, "_id");
  console.log("hawker id", hawkerID);
  const user = await Users.findByIdAndUpdate(id, { $push: { stalls: hawkerID } });
  console.log(user);
  res.status(200).json(hawker);
  } catch (error) {
    res.json({ error });
  }
});


//! EDIT
// router.get("/:id/edit", async (req, res) => {
//     const { id } = req.params;
//     const thisCar = await Cars.findById(id);
//     res.json(thisCar);
//   })


//! UPDATE
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const hawker = await Hawkers.findByIdAndUpdate(id, req.body)
  res.json(hawker)
})


//! DESTROY
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Owner = await Hawkers.findById(id, "owner")
    const userIDnumber = await Owner.owner.toString();
    console.log("Stall Owner", userIDnumber);
    const result = await Hawkers.findByIdAndDelete(id);
    const user = await Users.findByIdAndUpdate(userIDnumber, { $pull: { stalls: id } });
    res.json(result);


  } catch (error) {
    res.json({ error });
  }
});


module.exports = router;