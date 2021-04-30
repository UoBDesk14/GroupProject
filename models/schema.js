//Require Mongoose
let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date
});
