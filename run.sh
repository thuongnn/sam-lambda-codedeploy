sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket sam-lambda-codedeploy-321767375064
sam package --template-file template.yaml --output-template-file packaged.yaml
sam deploy --template-file /Users/thuongnn/Desktop/aws/learning/sam-lambda-codedeploy/packaged.yaml --stack-name sam-lambda-codedeploy-stack


### Cloudformation
#Github Token ARN (Secret Manager): arn:aws:secretsmanager:ap-southeast-1:321767375064:secret:GitHubToken-a9p1bL

aws s3 mb s3://sam-lambda-codedeploy-321767375064 --region ap-southeast-1
aws s3 cp pipeline.yaml s3://sam-lambda-codedeploy-321767375064/pipeline.yaml

aws cloudformation create-stack \
  --stack-name sam-lambda-codedeploy-stack \
  --template-url https://sam-lambda-codedeploy-321767375064.s3.amazonaws.com/pipeline.yaml \
  --parameters ParameterKey=S3Bucket,ParameterValue=sam-lambda-codedeploy-321767375064 \
               ParameterKey=S3Prefix,ParameterValue=lambda-code \
               ParameterKey=StackName,ParameterValue=sam-lambda-codedeploy-stack \
               ParameterKey=GitHubOwner,ParameterValue=thuongnn \
               ParameterKey=GitHubRepo,ParameterValue=sam-lambda-codedeploy \
               ParameterKey=GitHubBranch,ParameterValue=main \
               ParameterKey=GitHubTokenSecretArn,ParameterValue=arn:aws:secretsmanager:ap-southeast-1:321767375064:secret:GitHubToken-a9p1bL \
  --capabilities CAPABILITY_IAM