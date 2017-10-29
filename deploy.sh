#!/bin/sh

# deploy - deploy containers to Google Container Engine

gcloud config set project access-tracker
gcloud config set compute/zone asia-northeast1-a

kubectl --namespace=backend apply -f deployment/deployment.yaml
kubectl --namespace=backend apply -f deployment/service.yaml
