function createTable(){
  var params = {
    KeySchema: [
      {
        AttributeName: 'userId',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'showerId',
        KeyType: 'RANGE'
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'userId',
        AttributeType: 'S'
      },
      {
        AttributeName: 'showerId',
        AttributeType: 'S'
      },
      {
        AttributeName: 'startShowerDate',
        AttributeType: 'S'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    LocalSecondaryIndexes: [{
            IndexName: "showers",
            KeySchema: [
                {
                    AttributeName: "userId",
                    KeyType: "HASH"
                },
                {
                    AttributeName: "startShowerDate",
                    KeyType: "RANGE"
                }
            ],
            Projection: {
                ProjectionType: "ALL"
            }
        }],
    TableName: 'smartshowerusers',
    StreamSpecification: {
      StreamEnabled: false
    }
  };

  // Call DynamoDB to create the table
  DB.createTable(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
}
