// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:date_string?", function (req, res) {
  var {date_string} = req.params;
  let response = {};
  console.log(req.params);
//An empty date parameter should return the current time
  if (req.params.date_string == undefined) {
    //req.time = new Date().toUTCString();
    response = {
        unix: Date.now(),
        utc: new Date().toUTCString()
      };
//for request to /api/1451001600000    
  } else if (/\d{5,13}/.test(date_string)) {
      //req.time = new Date(parseInt(date_string, 10)).toUTCString();
      response = {
            unix: parseInt(date_string, 10),
            utc: new Date(parseInt(date_string, 10)).toUTCString()
        };
//for any text date requests like "05 October 2011"         
  } else if (new Date(date_string).toUTCString() != "Invalid Date") {
      //req.time = new Date(date_string).toUTCString();
      response = {
          unix: Date.parse(date_string),
          utc: new Date(date_string).toUTCString()
        };
//if cant read date error        
  } else {
    response = { error : "Invalid Date" };
  }
  
  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
