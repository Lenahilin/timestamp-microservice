var express = require('express');
var morgan = require('morgan')
require('dotenv').config();

var app = express();

// setting things up
app.use(morgan('combined'))
app.use(express.static('public'));

// homepage with usage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:timestamp?', (req, res) => {
  if (req.params.timestamp === undefined) {
    var timestamp = new Date();
  } else {
    // check if the given timestamp is unix epoch 
    let t = /^\d+$/.test(req.params.timestamp) ? Number(req.params.timestamp): req.params.timestamp;
    var timestamp = new Date(t);
  }

  if (timestamp == 'Invalid Date') {
    res.json({error : 'Invalid Date'});
  } else {
    res.json({unix: timestamp[Symbol.toPrimitive]('number'), utc: timestamp.toUTCString()});
  }
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
