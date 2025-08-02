sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket sam-lambda-codedeploy-321767375064
sam package --template-file template.yaml --output-template-file packaged.yaml
sam deploy --template-file /Users/thuongnn/Desktop/aws/learning/sam-lambda-codedeploy/packaged.yaml --stack-name sam-lambda-codedeploy-stack


### Cloudformation
aws codecommit create-repository --repository-name sam-lambda-codedeploy-repo --repository-description "Demo sam lambda codedeploy repository"


aws s3 mb s3://sam-lambda-codedeploy-321767375064 --region ap-southeast-1
aws s3 cp pipeline.yaml s3://sam-lambda-codedeploy-321767375064/pipeline.yaml

aws cloudformation create-stack \
  --stack-name sam-lambda-codedeploy-stack \
  --template-url https://sam-lambda-codedeploy-321767375064.s3.amazonaws.com/pipeline.yaml \
  --parameters ParameterKey=S3Bucket,ParameterValue=sam-lambda-codedeploy-321767375064 \
               ParameterKey=S3Prefix,ParameterValue=lambda-code \
               ParameterKey=StackName,ParameterValue=sam-lambda-codedeploy-stack \
               ParameterKey=CodeCommitRepoName,ParameterValue=sam-lambda-codedeploy-repo \
  --capabilities CAPABILITY_IAM