#!/usr/bin/env bash

# assume aws cli is installed and used is authorized.
aws dynamodb batch-write-item --request-items file://data.json
