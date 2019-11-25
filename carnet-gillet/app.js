  var mongoose = require('mongoose');
  var express = require("express");
  var app = express();
  var cors = require("./config/cors");
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(cors);

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: true 
}).then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

  var friend = require("./routes/friend");
  var auth = require("./routes/auth");
  var profile = require("./routes/profile");
  var search = require("./routes/search");
  var request = require("./routes/friendRequest");

  //********************************************************************** */

// Auth related
app.post('/auth/login', auth.login);
app.post('/auth/register', auth.register);

// Profile related
app.get('/profile',passport.authenticate('jwt', { session : false}),  profile.get);
app.post('/profile', passport.authenticate('jwt', { session: false }), profile.post);
app.get('/search', passport.authenticate('jwt', { session: false }), search.get);
// Friends related
app.get('/friends',passport.authenticate('jwt', { session : false}),  friend.getFriends);
app.post('/friends/remove/:friend_id',  friend.removeFriend);
app.post('/friends', passport.authenticate('jwt', { session : false}), friend.post);
app.get('/friendrequest', passport.authenticate('jwt', { session: false }), request.get);
app.post('/friendrequest/:user_id', passport.authenticate('jwt', { session: false }), request.post);
app.post('/friendrequest/removerequest/:id', passport.authenticate('jwt', { session: false }),request.delete);
var port = 4020;
app.listen(port, () => {
  console.log("Le serveur est opérationnel sur le numéro de port" + port);
});
