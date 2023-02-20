echo "Deploying Frontend..."
cd frontend
npm run build
aws s3 sync build/ s3://kwb-frontend