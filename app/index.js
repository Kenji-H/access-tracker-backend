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
app.use(errorHandler);

app.get('/status', function (req, res) {
    console.log(`received request for URL: ${req.path}`);
    res.status(200).end();
});

app.post('/pv', function (req, res) {
    console.log(`received request for URL: ${req.path}`);
    if (validator.validateEvent(req.body)) {
        pubsub.publishEvent('event', req.body);
        res.status(200).end();
    } else {
        res.status(400).end();
    }
});

function errorHandler(err, req, res, next) {
    res.status(500).end();
}

// no handler catch the request
function noResourceHandler(req, res, next) {
    console.log('404');
    res.status(404).end();
}
app.use(noResourceHandler);

app.listen(port);
