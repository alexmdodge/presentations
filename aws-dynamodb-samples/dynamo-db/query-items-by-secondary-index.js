// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
  var params = {
    TableName: 'Cars',
    IndexName: 'make-model-index',
    ExpressionAttributeValues: {
      ':colour': { S: 'red' },
      ':make': { S: 'Toyota' }
    },
    KeyConditionExpression: "make = :make",
    ProjectionExpression: 'make, model, availableColours',
    FilterExpression: 'contains (availableColours, :colour)',
  };

  // Call DynamoDB to add the item to the table
  ddb.query(params, function (err, data) {
    if (err) {
      console.log("Error: ", err);
      callback(err, null)
    } else {
      console.log("Success: ", data);
      callback(null, data)
    }
  });
};