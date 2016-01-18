var router = require('express').Router();
var model = require('./model');

function getRoot(req, res){
   model.getRoot(function(result){
       res.json(result);
   })
}

router.get("/", getRoot);

//add dynamic routes here

module.exports = router;