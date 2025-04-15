import pulumi_aws as aws


facilities_table = aws.dynamodb.Table("facilities",
    name="facilities",
    read_capacity=1,
    write_capacity=1,
    hash_key="name",

    attributes=[
        {
            "name": "name",
            "type": "S"
        }
    ])
