# Auction Scraper
A Restful service that serves up county property foreclosure auction data as json, using ``` request ``` to retrieve HTML pages and 
``` cheerio ``` JQuery-like syntax to load and scrape the page to create the json. This app currently runs a 'cron-like' job every 10 seconds that will run all included parsers and post data to corresponding nodes in firebase (see ``` config.js ```).
```
{
      date: [
          {
              plantiff: 'String',
              defendent: 'String',
              address: 'String',
              attorney:{
                  name: 'String',
                  number: 'String'
              },
              judgement: 'String'
          }    
      ]
      ...
}
```
Currently only a single endpoint that returns json for auctions listed on the North Charleston auctions page.
##Future Additions:
* ~~Store JSON in Firebase instead of calculating everytime~~ (Done!)
  * ~~add endpoints to fetch from these smaller nodes 
* More endpoints for more counties (feel free to add your own)
* ~~Dynamic Express endpoints (Sort of?)

#How to add your own/ contribute
This is an Express app and is structured in a way that encourages creating Express "Mini-Apps".
If you'd like to add a set of endpoints, I would recommend following these steps:
* Create a directory that will contain your ``` router.js ```, ``` parser.js ``` and ``` model.js ``` for your new set of endpoints.
* Your parser should do all the dirty work of scraping the data and posting it into firebase at the correct node. Follow the conventions shown in the n_charleston parser. Also remember to export your parse method so it can be included in the 'cron' job.
* Your router should have very little logic in it, other than maybe any authentication middleware (not sure why this would require any, but who knows!)
* Create model methods that will fetch the data from firebase
* Create any endpoints in the router, making appropriate model calls
* Register your endpoint parser in the ``` config.js ```
* Register your Express Router in the ``` index.js ```

#Tips
To make require paths 'neater' and not so '../../..', I created a symbolic link in my node_modules folder that points to your 'app' 
directory. The app will not work if you do not create this symbolic link.
* Navigate into node_modules
* ``` ln -nsf ../app ```

##Thanks!
