var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var ProfileSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  age: String,
  famille: String,
  role: String,
  nourriture: String
});
module.exports = mongoose.model("Profile", ProfileSchema);
