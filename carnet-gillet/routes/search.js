var Profile = require('../models/User');

module.exports = {
  get: function(req, res) {
    
          Profile.find().exec(function(err,result){res.send(result);});
    
}};
