var router = require('express').Router();
var model = require('./model');

function getRoot(req, res){
   model.getRoot(function(result){
       res.json(result);
   })
}

function getDate(req, res){
    model.getDate(req.params.dateString, function(result){
        res.json(result);
    })
}

function getAuction(req, res){
    model.getAuction(req.params.dateString, req.params.index, function(result){
        res.json(result);
    })
}

router.get("/", getRoot);

router.get("/:dateString", getDate);

router.get("/:dateString/:index", getAuction);

//add dynamic routes here

module.exports = router;