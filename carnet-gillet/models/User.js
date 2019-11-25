var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
 
  friends: [{ type: mongoose.Schema.ObjectId, ref: "Profile" }]
});

//Pre Save Hook. Used to hash the password
UserSchema.pre('save', function(next) {

     if (!this.isModified('password'))  {
       return next();
     }

    //Generate Salt Value
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      //Use this salt value to hash password
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });

    });

});

//Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
  bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}


module.exports = mongoose.model("User", UserSchema);
