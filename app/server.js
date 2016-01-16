var app = require('./index');
var config = require('app/config');


app.listen(config.express.port, function(error){
    if(error){
        console.log(error);
    }
    console.log("Express listening on http://localhost:" + config.express.port);
});

