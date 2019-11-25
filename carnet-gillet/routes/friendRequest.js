var FriendRequest = require("../models/Friend");
var User = require("../models/User");
var Profile = require("../models/profile");
const passport = require("passport");
module.exports = {
  get : function(req, res) {
    console.log(req.user);
    FriendRequest.find({ user: req.user })
      .populate("requester")
      .exec(function(err, result) {
        res.send(result
);
      });
  },
  post: function(req, res) {
    var ObjectId = require("mongoose").Types.ObjectId;
    var user, requester;

    User.findOne({ _id: req.params.user_id })
      .exec()
      .then(function(result) {
        user = result;
        return Profile.findOne({ user: req.user}).exec();
      })
      .then(function(result) {
        requester = result;
        return FriendRequest.findOne({
          requester: requester,
          user: user
        }).exec();
      })
      .then(function(result) {
        if (result) {
          return;
        } else {
          var friendRequest = new FriendRequest({
            requester: requester,
            user: user
          });
          return friendRequest.save();
        }
      })
      .then(function() {
        res.sendStatus(200);
      });
  },
  delete: function(req, res) {
    var ObjectId = require("mongoose").Types.ObjectId;
    FriendRequest.collection.remove({ _id: new ObjectId(req.params.id) });
    res.sendStatus(200);
  }
};
