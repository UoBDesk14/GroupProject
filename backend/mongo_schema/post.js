const dayjs = require('dayjs');
const mongoose = require("mongoose");
const uniqueValidatorPlugin = require("mongoose-unique-validator");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  comments: [{content: String, userName: String, createdAt: String}],
  createdAt: {
    type: String,
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    required: true,
  },
});

/*unique validator is a plugin that sends detailed responses if
values aren't unique*/
postSchema.plugin(uniqueValidatorPlugin);
module.exports = mongoose.model("Post", postSchema, 'Post');