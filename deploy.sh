#!/usr/bin/env bash
# This script assumes aws cli is installed and aws credentials are active in the shell.

# Build backend
cd backend
npm install
npm run buildzip
cd ..

# Build infrastructure and deploy backend
cd infra
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

pulumi stack init dev
pulumi up
eval $(pulumi stack output --shell)
cd ..

# Populate the database
cd utils
source populateDB.sh
cd ..

# Build and deploy frontend
cd frontend
echo "NEXT_PUBLIC_BACKEND_URL=$backend_url" > .env
npm install
npm run buildzip

read job_id zip_url < <(aws amplify create-deployment --app-id "$amplify_app_id" --branch-name "prod" --output text)
curl -T out.zip "$zip_url"
aws amplify start-deployment --app-id "$amplify_app_id" --branch-name "prod" --job-id "$job_id"

# Print final deployed URL
echo "✅ Application URL: https://prod.$amplify_app_id.amplifyapp.com"
