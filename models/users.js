const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true },
  displayname: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  display_picture: { type: String, default: "/Portrait_Placeholder.png" },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hawkers" }],
  stalls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hawkers" }],
  is_hawker: { type: Boolean, required: true, default: false },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
