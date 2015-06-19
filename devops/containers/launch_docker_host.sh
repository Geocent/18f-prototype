#!/usr/bin/env bash

docker-machine create \
    --driver amazonec2 \
    --amazonec2-access-key ${AWS_ACCESS_KEY_ID} \
    --amazonec2-secret-key ${AWS_SECRET_ACCESS_KEY} \
    --amazonec2-vpc-id ${AWS_VPC_ID} \
    --amazonec2-subnet-id ${AWS_SUBNET_ID} \
    --amazonec2-zone ${AWS_ZONE} \
    --amazonec2-instance-type ${AWS_INSTANCE_TYPE} \
    $1
