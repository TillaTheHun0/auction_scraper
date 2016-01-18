var Firebase = require('firebase');
var CronJob = require('cron').CronJob;
var moment = require('moment');

function parse(){
    //loop through entry points, parse, and overrite data
    config.entryPoints.forEach(function(entryPoint){
        var cur = require("app/"+ entryPoint +"/parser");
        var node = cur.node;
        cur.parse(function(result){
            //overrite the node in firebase
            config.firebaseRef.child(node).set(result, function(error){
                if(error) console.log("error occurred overriting node: ", node);
                else console.log("successfully set data node: ", node);
            });
        }); 
    });
    
    //set lastCronJob date for cache invalidation purposes
    config.lastCronJob = moment().format();
    console.log("Cron Job successfully ran at: ", config.lastCronJob);
}

new CronJob('10 * * * * *', parse, null, true, 'America/Los_Angeles');

var config = {};

//dir names for each set of endpoints
config.entryPoints = [
    'n-charleston'
];

config.express = {
    port: process.env.PORT || 3000,
    ip: "127.0.0.1"
};

config.firebaseRef = new Firebase("https://auction-scraper.firebaseio.com/");

module.exports = config;