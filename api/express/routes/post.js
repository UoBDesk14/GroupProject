const dayjs = require('dayjs');
const express = require("express");
const router = express.Router();
const User = require("../../db/user");
const Post = require("../../db/post");

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
    .sort([['updatedAt', -1], ['_id',-1]])
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

router.get('/detail', (req, res) => {
  const {id} = req.query
  Post.find({ _id: id})
    .exec((err, data) => {
      res.status(200).json(
        {
          status: 1,
          message: '成功',
          data: data || {},
        }
      )
  })
})

router.post('/comment', (req, res) => {
  const {content, username, id} = req.body
  console.log(username)
  Post.find({_id: id}).exec((err, data) => {
    console.log(data)
    Post.updateOne({_id: id}, {$set: {updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')},$push: {comments: {
        content, username
      }}}).exec((err, data) => {
        res.status(200).json({
          status: 1,
          message: '成功',
          data: data || {},
        })
    })
  })
})

router.get('/deleteItem', (req, res) => {
  const {id} = req.query
  Post.findById({_id: id}, (err, doc) => {
    if (!err) {
      doc.remove((err) => {
        if (!err) {
          res.json({
            status: 1,
            message: '成功',
            data: {},
          })
        }
      })
    }
  })
})


module.exports = router;
