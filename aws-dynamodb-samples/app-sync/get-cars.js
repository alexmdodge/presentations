// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({ region: 'us-east-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
  var params = {
    TableName: 'Cars',
    ProjectionExpression: 'vin, make, model, availableColours',
  };

  // Call DynamoDB to add the item to the table
  ddb.scan(params, function (err, data) {
    if (err) {
      console.log("Error: ", err);
      callback(err, null)
    } else {
      console.log("Success: ", data);
      const cars = data.Items.map(car => {
        console.log('Car is: ', car)
        return {
          vin: car.vin.S,
          model: car.model.S,
          make: car.make.S,
          availableColours: car.availableColours.L.map(colour => colour.S)
        }
      })
      callback(null, cars)
    }
  });
};