
const aws = require('aws-sdk');
const config = require("./dynamo.config");

aws.config.update(config);

const DB  = new aws.DynamoDB({
  apiVersion:'2012-08-10'
});

module.exports = new Promise((resolve, reject) => {
  resolve({
    createNewShower: require('./db_actions/getLastShower.js')(DB),
    getLastShower:   require('./db_actions/createNewShower.js')(DB)
  })
})
