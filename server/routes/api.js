const express = require('express');
const router = express.Router();
var { user } = require('../../src/app/models/user');

/* GET api listing. */
router.get('/', function (req, res) {
  res.header("Content-Type",'application/json');
  user.find((err,docs)=>{
    if(!err){ res.send(docs);}
    else{console.log(err);}
  });
})

module.exports = router;
