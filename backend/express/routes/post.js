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

router.get('/list', (req, res) => {
  const {page, pageSize} = req.query
  Post
    .find({})
    .skip((page - 1) * pageSize)
    .limit(Number(pageSize))
    .sort([['_id',-1]])
    .exec((err, data) => {
      Post.count((err2, count) => {
        res.status(200).json(
          {
            status: 1,
            message: '成功',
            data: data || [],
            total: count
          }
        )
      })
    });
})


module.exports = router;
