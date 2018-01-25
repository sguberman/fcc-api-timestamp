// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:DATE", function (request, response) {
  var DATE = request.params.DATE
  var unix = null
  var natural = null
  var date;
  
  if (isNaN(Number(DATE))) {
    date = moment(DATE)
  } else {
    date = moment(Number(DATE) * 1000)
  }
  
  if (date.isValid()) {
    unix = Number(date.format("X"))
    natural = date.format("MMMM D, YYYY")
  }
  response.send({
    unix: unix,
    natural: natural
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
