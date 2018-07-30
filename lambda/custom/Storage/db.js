
var localUrl = 'mongodb://localhost:27017/';
var prodUrl  =  process.env.ATLAS_MONGODB_URL;
var mongoose = require('mongoose');
var DB       = null;

async function connectTo(dbname){

  if(process.env.PRODUCTION){
      var url = prodUrl;
  }
  else{
      var url   = localUrl + dbname;
  }


  return new Promise((resolve, reject) => {

    //Already connected
    if(DB){
      resolve(DB);
    }

    let options = { useNewUrlParser: true };

    mongoose.connect(url, options,function(err){
      if(err){
        console.error("ERROR in db.js",err)
        console.error('Error mongoose could not connect to \'%s\' db',dbname)
        reject(err)
      }
      else{
        //Remember the connection
        DB = this;
        //console.log(DB)

        console.log('mongoose connected to \'%s\' db',dbname);
        resolve() //return the connection
      }
    })

  });



}

module.exports = connectTo;
