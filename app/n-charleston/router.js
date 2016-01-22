var router = require('express').Router();
var model = require('./model');

function getRoot(req, res, next){
   model.getRoot(function(result){
       res.json(result);
   })
}

function getDate(req, res, next){
    model.getDate(req.params.dateString, function(result){
        if(result == null) {
           next(new Error("Could not retrieve auctions for date: " + req.params.dateString));
        }
        else{
            res.json(result);
        }
    })
}

function getAuction(req, res, next){
    model.getAuction(req.params.dateString, req.params.index, function(result){
        if(result == null) {
           next(new Error("Could not retrieve auction at index: " + req.params.index));
        }
        else{
            res.json(result);
        }
    })
}

router.get("/", getRoot);

router.get("/:dateString", getDate);

router.get("/:dateString/:index", getAuction);

//add dynamic routes here

module.exports = router;