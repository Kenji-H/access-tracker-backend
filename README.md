# Access Tracker Backend

This is a component of Access Tracker, which is a sample application built on Google Cloud Platform.

## Features
* node.js server get requests
* requests are validated with a schema definition
* valid data are published to Google Cloud Pub/Sub

## Development 
### requirement
* Node 8.8.1
* Docker 17.09

### unittest
Not available yet.

## Deployment
### prepare a cluster
This application is supposed to be run on Google Container Engine. Prepare the cluster first and set secret keys as follows:

```
kubectl --namespace=backend create secret generic gcp-key --from-file=key.json=/local/file/path.json
```

### build container
```$ bash scripts/build.sh```

### deploy to server
```$ bash scripts/deploy.sh```
