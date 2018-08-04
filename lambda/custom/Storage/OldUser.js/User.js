const dbname = "smartshower";
var mongoose = require('mongoose')

mongoose.Promise = Promise;

var userSchema = {

	  _id: {type:String, required:true },

    showers: { type: Array, default: []}
}

module.exports = new Promise((resolve, reject) => {

	connect().then(function(){
		resolve({
			find: find,
		  create: create,
		  updateShower: updateShower,
		  getLastShower: getLastShower
		})
	})
	.catch(function(e){
		console.error(e);
		reject();
	})

})


var User = mongoose.model('User', userSchema, 'users');



function find(id) {
  return new Promise((resolve, reject) => {

		if(mongoose.connection.readyState !== 1){
      console.error("not connected to db")
      reject()
    }

    User.findOne({_id: id}).lean().exec(function(e,user){
      if(e){

        console.error("unable to get user data")
        reject(e);
      }
      else{

				//might not want to do this if I'm going to make multiple requests
				//per handler
				mongoose.disconnect()

        //user
        resolve(user)
      }
    })

  });
}

function create(id) {



  return new Promise((resolve, reject) => {

		if(mongoose.connection.readyState !== 1){
      console.error("not connected to db")
      reject()
    }

    let newUser = {
      _id: id
    }
    console.log("creating user")

    //Create new User
    User.update({_id:id},newUser,{upsert: true}).lean().exec(function(e,u){

      if(e){
        console.error("unable to save new user");

        reject(e);
      }
      else{

				//might not want to do this if I'm going to make multiple requests
				//per handler
				mongoose.disconnect()

        console.log("saved new user",u)
        resolve(u);
      }

    })

  });
}

//query should be _id
//newShower should be newShower entry for array of showers
function updateShower(id, newShower) {
  return new Promise((resolve, reject) => {

		if(mongoose.connection.readyState !== 1){
      console.error("not connected to db")
      reject()
    }

    console.log("updating: ", id, "with newShower: ", newShower);
    //update Shower Data
    User.findByIdAndUpdate(id,{ $push: { showers : newShower } }).exec(function(e,u){

      if(e){
        console.error("unable to save shower");
        reject(e);
      }
      else{

				//might not want to do this if I'm going to make multiple requests
				//per handler
				mongoose.disconnect()

        console.log(u)
        resolve(u)
      }

    })

  });
}


function getLastShower(id) {
  return new Promise( (resolve, reject) => {

		if(mongoose.connection.readyState !== 1){
      console.error("not connected to db")
      reject()
    }

    console.log("Get Last shower for : ", id);
    //update Shower Data
    User.findOne({_id: id},{ showers: { $slice: -1 } }).lean().exec(function(e,u){

      if(e){
        console.error("unable to get last shower",e);
        reject(e);
      }
      else{
        //console.log(u)

        if(u.showers){
          if(u.showers[0]){
            if(u.showers[0].date){

							var date = new Date(u.showers[0].date);

							if(date){

								resolve(date)
							}
							else{
								reject("unable to convert last shower date data to a date object");
							}


            }
          }
        }
				console.log("Probably no showers yet");
        resolve("0 showers");
      }

    })

  });
}

async function connect(){
	var dbconnect = require('./db.js')

	try{
		var db = await dbconnect(dbname);
		return db;
	}
	catch(e){
		console.error(e);
		return null;
	}

}
