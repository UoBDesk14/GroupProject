const express = require('express');
const router = express.Router();


/* GET api listing. */
router.get('/', function (req, res) {
  res.header("Content-Type",'application/json');

})

module.exports = router;
