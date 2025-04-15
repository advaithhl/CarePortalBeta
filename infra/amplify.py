from pulumi import export
import pulumi_aws as aws

example = aws.amplify.App("careportal_frontend",
    name="checkmate-frontend-prod",
    custom_rules=[{
        "source": "/<*>",
        "status": "404-200",
        "target": "/index.html",
    }])

example_prod_branch = aws.amplify.Branch("careportal_frontend_prod_branch",
    app_id=example.id,
    branch_name="prod",
    stage="PRODUCTION",
    description="CarePortalBeta frontend production"
)

export("amplify_app_id", example.id)

__all__ = ["example"]
