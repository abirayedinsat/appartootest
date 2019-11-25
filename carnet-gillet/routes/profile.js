var Profile = require("../models/profile");

module.exports = {
  get: function(req, res) {
    req.body.user = req.user;
    Profile.findOne({ user: req.user }, function (err, profile) {
     
       res.send({
         profile : profile
       });
      
    });
  },
  post: function(req, res) {
    req.body.user = req.user;

    Profile.findOne({ user: req.user }, function(err, profile) {
      if (!profile) {
        profile = new Profile(req.body);
      } else {
     
        profile.role = req.body.role;
if ((req.body.age.toString()).length != 0){
        profile.age = req.body.age;}
 if ((req.body.famille.toString()).length != 0){
        profile.famille = req.body.famille;}
if ((req.body.nourriture.toString()).length != 0){
        profile.nourriture = req.body.nourriture;
      }}

      profile.save();
    });

    res.sendStatus(200);
  }
};
