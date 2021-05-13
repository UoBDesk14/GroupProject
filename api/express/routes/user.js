const express = require("express");
const router = express.Router();
const User = require("../../db/user");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  if (req.body.username === "null") {
    return res.json({
      message: "Username Taken",
      status: 1,
    });
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  user
    .save()
    .then((confirmDoc) => {
      res.status(201).json({
        message: "The user has been successfully registered",
        data: confirmDoc,
        status: 1,
      });
    })
    .catch((error) => {
      res.json({
        message: "Unable to login with these credentials",
        status: 0,
      });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((query) => {
    if (query === null) {
      return res.json({
        message: "Incorrect username",
        status: 0
      });
    }
    const userPassword = query.password;
    auth(req.body.username, req.body.password, userPassword, res);
  });
});
const secretKey = "test-code large number: 2333333333333333333333333333333333333333";
function auth(
  username,
  password,
  authPassword,
  res
) {
  if (password !== authPassword) {
    return res.json({
      message: "Incorrect password",
      status: 0
    });
  }
  const token = jwt.sign(
    {
      username: username,
      password: password,
    },
    secretKey
  );
  return res.status(200).json({
    token: token,
    username: username,
  });
}

module.exports = router;
