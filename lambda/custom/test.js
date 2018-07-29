var User = require("./Storage/User.js");


//getUserData
User.findOne({_id: "2"}).exec(function(e,u){
  if(e){
    console.log("unable to get user data")
  }
  else{
    //user
    console.log(u)
  }
})

//update Shower Data
User.findByIdAndUpdate("1",{ $push: { shower: newShower } }).exec(function(e,u){

  if(e){
    console.error("unable to save shower");
  }
  else{
    console.log(u)
  }

})

//Create new User
User.findByIdAndUpdate("3",{id:"3",showers: []},{upsert: true}).exec(function(e,u){

  if(e){
    console.error("unable to save new user");
  }
  else{
    console.log("saved new user")
  }

})
