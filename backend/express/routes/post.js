const express = require("express");
const router = express.Router();
const User = require("../../mongo_schema/user");
const Post = require("../../mongo_schema/post");

router.post("/add", (req, res, next) => {
  /*cant use null as a username*/
  /*save the data in mongoDb*/
  const {username, title, content} = req.body;
  const post = new Post({
    username,
    title,
    content
  })
  post
    .save()
    /*when promise arrives send the response back to the frontend*/
    .then((confirmDoc) => {
      res.status(200).json({
        message: "post success",
        data: confirmDoc,
        status: 1,
      });
    })
    /*this error will be if the email/username isn't unique*/
    .catch((error) => {
      res.json({
        message: "unable to post",
        status: 0,
      });
    });
});


module.exports = router;
