const dbname = "smartshower";
var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

var userSchema = {

	  _id: {type:String, required:true },

    showers: { type: Array, default: []}
}

var User = mongoose.model('User', userSchema, 'users');

// function connect(){
//   return new Promise((resolve, reject) => { resolve() });
// }

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

async function create(id){
  return new Promise((resolve, reject) => {

    let newUser = {
      _id: id,
      showers: []
    }

    console.log("creating user",newUser,"mongoose readystate",mongoose.connection.readyState)

    if(mongoose.connection.readyState !== 1){
      console.error("not connected to db")
      reject()
    }


    var promise = User.update({_id:id},newUser,{upsert:true}).exec();

    return promise;

    //Create new User
    // User.findByIdAndUpdate(id,newUser,{upsert: true}).lean().exec(function(e,u){
    //
    //   if(e){
    //     console.error("unable to save new user");
    //     reject(e);
    //   }
    //   else{
    //     console.log("saved new user",u)
    //     resolve(u);
    //   }
    //
    // })

  });
}


module.exports = new Promise((resolve, reject) => {

	connect().then(function(){
		resolve({
		  create: create
		})
	})
	.catch(function(e){
		console.error(e);
		reject();
	})

})
