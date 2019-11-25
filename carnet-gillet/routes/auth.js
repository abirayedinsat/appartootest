var User = require('../models/User');
var Profile = require('../models/profile');
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport); 
module.exports = {
  login: function (req, res,next) {
     const username = req.body.username;
  const password = req.body.password;

  const query = { username}
  //Check the user exists
  User.findOne(query, (err, user) => {
    //Error during exuting the query
    if (err) {
      return res.send({
        success: false,
        message: 'Error, please try again'
      });
    }

    //No User match the search condition
    if (!user) {
      return res.send({
        success: false,
        message: 'Error, Account not found'
      });
    }

    //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

        //Invalid password
        if (!isMatch) {
          return res.send({
            success: false,
            message: 'Error, Invalid Password'
          });
        }

        //User is Valid

        const ONE_WEEK = 604800; //Token validtity in seconds

        //Generating the token
        const token = jwt.sign({ user },"abirayed", { expiresIn: ONE_WEEK });

        //User Is Valid
        //This object is just used to remove the password from the retuned filds
        let returnUser = {
          username: user.username,
          id: user._id

        }


        //Send the response back
        return res.send({
          success: true,
          message: 'You can login now',
          user: returnUser,
          token
        });
    });
     });

  },

  register : function (req, res, next) {

     let newUser = new User({
   
    username: req.body.username,
    password: req.body.password,
  
  });
console.log("user mongo",newUser.username);
 let newProfile = new Profile({
role:  req.body.role,
age:  req.body.age,
user: newUser,
famille:  req.body.famille,
nourriture:  req.body.nourriture
});


  newUser.save((err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Failed to save the user'
      });
    }
       newProfile.save();
   
    res.send({
      success: true,
      message: 'User Saved yes',
      user,
      newProfile, 
    });
  });
   
  }

}
