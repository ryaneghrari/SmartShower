module.exports = new Promise((resolve, reject) => {
  resolve({
    createNewShower: createNewShower,
    getLastShower: getLastShower
  })
})

const aws = require('aws-sdk');
const config = require("./dynamo.config");

aws.config.update(config);
const DB  = new aws.DynamoDB({
  apiVersion:'2012-08-10'
});


function createNewShower(userId, showerId){

  let d = new Date;
  let now = d.toString();

  let params = {
    TableName: "smartshowerusers",
    Item: {
      userId:{
        S: userId
      },
      showerId:{
        S: generateShowerId()
      },
      startShowerDate:{
        S: now
      }
    }
  }

  return new Promise((resolve, reject) => {

  DB.putItem(params,function(e,s){
      if(e){
        reject(e);
      }
      else{
        resolve(s);
      }
    })
  })
}

async function getLastShower(userId){

    try{

      let showerData = await getLastShowerFromDynamo(userId);

      if(!showerData.Items[0]){
        return "no showers";
      }

      let dateData = showerData.Items[0].startShowerDate.S;

      if(!dateData){ throw new Error("DateData was undefined") }

      let date = new Date(dateData);

      return date;
    }
    catch(e){
      console.error(e);
      throw new Error(e);
    }
}


function getLastShowerFromDynamo(userId){

  let d = new Date;
  let now = d.toString();


  let params = {
      TableName: 'smartshowerusers',
      IndexName: 'showers', // optional (if querying an index)
      KeyConditions: { // indexed attributes to query
                       // must include the hash key value of the table or index
                       // with 'EQ' operator
          userId: {
              ComparisonOperator: 'EQ', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
                                        //  NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH)
              AttributeValueList: [ { S: userId }, ],
          },
          startShowerDate: {
              ComparisonOperator: 'LT', // (EQ | NE | IN | LE | LT | GE | GT | BETWEEN |
                                        //  NOT_NULL | NULL | CONTAINS | NOT_CONTAINS | BEGINS_WITH)
              AttributeValueList: [ { S: now }, ],
          },
          // more key conditions ...
      },
      ScanIndexForward: false, // optional (true | false) defines direction of Query in the index
      Limit: 1, // optional (limit the number of items to evaluate)
      ConsistentRead: true, // optional (true | false)
      Select: 'ALL_ATTRIBUTES'
  };

  return new Promise((resolve, reject) => {
      DB.query(params, function (e, s) {
          if(e){
            reject(e);
          }
          else{
            resolve(s);
          }
      });
  })
}

//to generate the same id you would have to, on the same node,
//at the same time, generate the same random number 0-1,000,000,000
function generateShowerId(){
  let d = new Date();
  let t = d.getTime();

  //node ID
  let nodeId = 5;

  let random = (Math.floor(Math.random()* 1000000000) )

  let id = (t.toString(16) +"-"+ nodeId.toString(16) +"-"+ random.toString(16));

  return id;
}
