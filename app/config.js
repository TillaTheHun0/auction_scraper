var Firebase = require('firebase');
var CronJob = require('cron').CronJob;
var moment = require('moment');

function parse(){
    //require all parsers here and call there parse method
    require("app/n-charleston/parser").parse();
    config.lastCronJob = moment().format();
    console.log("Cron Job successfully ran at: ", config.lastCronJob);
}

new CronJob('10 * * * * *', parse, null, true, 'America/Los_Angeles');

var config = {};

config.express = {
    port: process.env.PORT || 3000,
    ip: "127.0.0.1"
};

config.firebaseRef = new Firebase("https://auction-scraper.firebaseio.com/");

module.exports = config;