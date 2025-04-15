from pulumi import export
import pulumi_aws as aws

careportal_frontend = aws.amplify.App("careportal_frontend",
    name="careportal-frontend-prod",
    custom_rules=[{
        "source": "/<*>",
        "status": "404-200",
        "target": "/index.html",
    }])

careportal_frontend_prod_branch = aws.amplify.Branch("careportal_frontend_prod_branch",
    app_id=careportal_frontend.id,
    branch_name="prod",
    stage="PRODUCTION",
    description="CarePortalBeta frontend production"
)

export("amplify_app_id", careportal_frontend.id)

__all__ = ["careportal_frontend"]
