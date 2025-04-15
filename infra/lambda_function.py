import json
import pulumi_aws as aws
from pulumi import FileArchive
import dynamodb
from amplify import example

backend_role = aws.iam.Role(
    "backendAssumeRole",
    assume_role_policy=json.dumps({
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            }
        }]
    })
)

backend_policy = aws.iam.RolePolicy(
    "backendPolicy",
    role=backend_role.id,
    policy=dynamodb.facilities_table.arn.apply(lambda arn: json.dumps({
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem"
            ],
            "Resource": arn
        }]
    }))
)

backend_basic_execution = aws.iam.RolePolicyAttachment(
    "backendBasicExecution",
    role=backend_role.name,
    policy_arn="arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
)

# Lambda function name
lambda_name = "carePortalBetaBackend"

# Create the Lambda function
care_portal_lambda = aws.lambda_.Function(
    lambda_name,
    name=lambda_name,
    role=backend_role.arn,
    runtime="nodejs18.x",
    handler="index.handler",
    code=FileArchive("../backend/lambda.zip"),
    timeout=10,
    architectures=["arm64"] # change to variable if needed.
)

care_portal_lambda_function_url = aws.lambda_.FunctionUrl(
    f"{lambda_name}FunctionUrl",
    function_name=care_portal_lambda.name,
    authorization_type="NONE",
    cors=aws.lambda_.FunctionUrlCorsArgs(
        allow_credentials=False,
        allow_headers=["Content-Type"],
        allow_methods=["GET"],
        allow_origins=[
            example.default_domain.apply(lambda domain: f"https://prod.{domain}")
        ],
        expose_headers=["*"]
    )
)
