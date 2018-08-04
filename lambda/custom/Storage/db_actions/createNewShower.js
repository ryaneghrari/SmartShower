module.exports = function (DB) {


  return function createNewShower(userId, showerId){

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

}
