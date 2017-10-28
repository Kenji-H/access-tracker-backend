const os = require('os');
const express = require('express');
const bodyParser = require('body-parser');
const pubsub = require('./pubsub');
const validator = require('./validator');

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
    if (validator.validateEvent(req.body)) {
        pubsub.publishEvent('event', req.body);
    }
    res.status(200).end();
});

app.listen(port);
