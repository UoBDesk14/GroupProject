//Require Mongoose
let mongoose = require('mongoose');

//Define a schema
let User = mongoose.Schema;

let User = new User({
  id: String,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  token: String,
});

module.exports = mongoose.model('User', User );
