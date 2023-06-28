#!/bin/bash

# Syntax ./bash.sh <IMAGE_NAME> <IMAGE_TAG> <CONTAINER_NAME> <HOST_PORT>

IMAGE_NAME='centic'
IMAGE_TAG='latest'
OLD_IMAGE=$IMAGE_NAME-old
CONTAINER_NAME='centic-container'
HOST_PORT=3000

if [ "$1" ]; then
    HOST_PORT=$1
fi

if ! [[ "$IMAGE_NAME" && "$IMAGE_TAG" && "$CONTAINER_NAME" && "$HOST_PORT" ]]; then
    echo "Invalid parameters"
    exit 1
fi

echo "IMAGE_NAME=$IMAGE_NAME"
echo "IMAGE_TAG=$IMAGE_TAG"
echo "OLD_IMAGE=$OLD_IMAGE"
echo "CONTAINER_NAME=$CONTAINER_NAME"
echo "HOST_PORT=$HOST_PORT"

# remove old image if exists
if [ "$(docker images -q $OLD_IMAGE)" ]; then
    docker rmi $OLD_IMAGE:$IMAGE_TAG
fi

# change the current image to the old image so that we can rollback
# in case something goes wrong when building a new image
if [ "$(docker images -q $IMAGE_NAME:$IMAGE_TAG)" ]; then
    docker image tag $IMAGE_NAME:$IMAGE_TAG $OLD_IMAGE:$IMAGE_TAG
    docker rmi $IMAGE_NAME:$IMAGE_TAG
fi

# build image
echo "Building image..."
docker build --tag $IMAGE_NAME:$IMAGE_TAG .

# exit if build failed
if ! [ "$(docker images -q $IMAGE_NAME:$IMAGE_TAG)" ]; then
    # restore image
    docker image tag $OLD_IMAGE:$IMAGE_TAG $IMAGE_NAME:$IMAGE_TAG
    docker rmi $OLD_IMAGE:$IMAGE_TAG
    exit 1
fi

# stop and remove running container
if [ "$(docker ps -aq -f status=running -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
fi

if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
    docker rm $CONTAINER_NAME
fi

# restart
docker run -d -p $HOST_PORT:80 --name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG
echo "Service restarted\n"

# list all running containers
docker ps
