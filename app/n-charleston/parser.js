var request = require('request');
var cheerio = require('cheerio');
var ref = require('../config').firebaseRef;

var node = 'north_charleston';

//set to point to north charleston node
ref = ref.child(node);
/**
 * Model scrapes all the shiz off the site and outputs nice JSON
 * 
 * JSON Object Schema
 * [
    {
        date: 'date',
        auctions : 
        [
            {
                plantiff: 'String',
                defendent: 'String',
                address: 'String',
                attorney:{
                    name: 'String',
                    number: 'String'
                },
                location: 'String',
                judgement: 'String'
            }    
        ]
    }
   ]   
 */

var url = "http://www.charlestoncounty.org/foreclosure/runninglist.html";

/**
 * pulls table out of loaded data
 */
function parse(callback){
  request(url, function(err, res, html){
      if(err) return console.error(err);
      var $ = cheerio.load(html); 
      var result = {};
      //grab all rows - minus header row
      var data = $('table tr').not(':first-child');
      
      //loop through rows
      $(data).each(function(i, elem){
         //result does not contain date key
         var dateKey = $('td:first-child > p:first-child', elem).text();
         
         var cells = $(elem).children();
             var obj = {};
             obj.plantiff = $('p:first-child', cells[1]).text().replace(/\r\n/g,'');
             obj.defendant = $('p:first-child', cells[2]).text().replace(/\r\n/g,'');
             obj.address = $('p', cells[3]).children().eq(1).text().replace(/\r\n/g,'');
             obj.judgement = $('p:first-child', cells[4]).text();
             obj.attorney = {
                 name: $('p:first-child', cells[6]).text().replace(/\r\n/g,''),
                 phone: $('p', cells[6]).last().children().text()
             }
             obj.city = $('p:first-child', cells[7]).text().replace(/\r\n/g,'');
         if(!( dateKey in result )) {
             result[dateKey] = [];
         }
         result[dateKey].push(obj);
      })
      callback(result);
   });
}

exports.parse = parse;
exports.node = node;