#!/bin/sh

# build - build a container and push it to Google Container Registry

gcloud config set project access-tracker
gcloud config set compute/zone asia-northeast1-a

PROJECT_ID="$(gcloud config get-value project)"
docker build -t gcr.io/${PROJECT_ID}/access-tracker-backend:latest .

gcloud docker -- push gcr.io/${PROJECT_ID}/access-tracker-backend:latest

