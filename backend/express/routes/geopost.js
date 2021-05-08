const express = require("express");
const router = express.Router();
const GeoJson = require("../../mongo_schema/geoJson");
const User = require("../../mongo_schema/user");


/*gets all post from the db*/
router.get("", (req, res, next) => {
  GeoJson.find()
    .then((allGeoPost) => {
      res.status(200).json({
        message: "Coordinates sent from database",
        geoPost: allGeoPost,
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "unable to retrieve the data",
        error: error,
      });
    });
});

/*saves a post to the database*/
router.post("", (req, res, next) => {
  const username = req.body.properties.username;
  User.find({ username: username })
    .then((user) => {
      const newPost = new GeoJson({
        type: req.body.type,
        geometry: {
          type: req.body.geometry.type,
          coordinates: [
            req.body.geometry.coordinates[0],
            req.body.geometry.coordinates[1],
          ],
        },
        properties: {
          userDetails: user[0]._id,
          username: username,
          dateTime: req.body.properties.dateTime,
          keyword: req.body.properties.keyword,
          mood: req.body.properties.mood,
          textBody: req.body.properties.textBody,
        },
      });
      newPost
        .save()
        .then((dbResponse) => {
          return res.status(200).json({
            message: "geoPost saved in database",
            id: dbResponse._id,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "unable to save this data",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "user doesnt exist",
        error: error,
      });
    });
});

/*sort the date by -1*/
router.get("/:username", (req, res, next) => {
  GeoJson.find({
    "properties.username": req.params.username,
  })
    .sort({ "properties.dateTime": -1 })
    .then((posts) => {
      res.status(200).json({
        message: "sucessfull",
        userposts: posts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "internal error",
        error: error,
      });
    });
});

/*removes post from the db*/
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  GeoJson.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "Post deleted",
        result: result,
      });
    })
    .catch((error) => {
      res.status(401).json({
        message: "Post doesn't exist",
        error: error,
      });
    });
});

module.exports = router;
