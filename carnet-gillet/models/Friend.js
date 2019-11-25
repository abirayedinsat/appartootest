var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.ObjectId, ref: "Profile" },
  user: { type: mongoose.Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Friend", FriendSchema);
