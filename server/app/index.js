const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/status', function (req, res) {
    console.log(`received request for URL: ${req.path}`);
    res.status(200).end();
});

app.post('/pv', function (req, res) {
    console.log(`received request for URL: ${req.path}`);

    var userid = req.body.userid;
    var timestamp = req.body.timestamp;
    var url = req.body.url;
    var userAgent = req.body.userAgent;

    // TODO: publish to pub/sub
    console.log(`userid: ${userid}`);
    console.log(`timestamp: ${timestamp}`);
    console.log(`url: ${url}`);
    console.log(`userAgent: ${userAgent}`);

    res.status(200).end();
});

app.listen(port);
