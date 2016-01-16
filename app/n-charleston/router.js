var router = require('express').Router();
var model = require('./model');

function getAuctions(req, res){
   model.fetchTable(function(result){
       res.json(result);
   })
}

router.get("/users", getAuctions);

module.exports = router;