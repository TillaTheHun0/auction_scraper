var ref = require('../config').firebaseRef;
var lastCronJob = require('../config').lastCronJob;
var node = require('parser').node;

//set root ref to be north_charleston node
ref = ref.child(node);

/**
 * compare date of last cron job run, if different, query firebase and set date
 * if not different day, than just use cached object and dont hit firebase 
 * */
var data = {};

var model = {};

model.getRoot = function(callback){
    ref.on('value', function(snapshot){
        callback(snapshot.val());
    });
}

model.getDate = function(dateString, callback){
    ref.child(dateString).on('value', function(snapshot){
        callback(snapshot.val());
    })
}

model.getAuction = function(dateString, index, callback){
    ref.child(dateString).child(index).on('value', function(snapshot){
        callback(snapshot.val());
    })
}

module.exports = model;