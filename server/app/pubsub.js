const os = require('os');
const pubsub = require('@google-cloud/pubsub');

var projectId = process.env.GCP_PROJECT;
var key = process.env.GCP_KEY
var client = pubsub({
    projectId: projectId,
    keyFilename: key
});

function getTopic(topicName) {
    return new Promise(function (resolve, reject) {
        client.createTopic(topicName, (err, topic) => {
            if (!err) { // topic created
                resolve(topic);
            } else if (err.code == 6) { // topic already exists
                resolve(client.topic(topicName));
            } else { // error
                reject(err);
            }
        });
    });
}

function publish(data) {
    return function (topic) {
        return new Promise(function (resolve, reject) {
            var publisher = topic.publisher();
            var jsonStr = JSON.stringify(data);
            var buf = Buffer.from(jsonStr);
            publisher.publish(buf, (err) => {
                if (!err) {
                    resolve(jsonStr);
                } else {
                    reject(err);
                }
            });
        });
    }
}

function onSuccess(value) {
    console.log(`success: ${value}`);
}

function onError(error) {
    console.error(`error: ${error.stack}`);
}

function publishEvent(topicName, data) {
    getTopic(topicName)
        .then(publish(data))
        .then(onSuccess)
        .catch(onError);
}
