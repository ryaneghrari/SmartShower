/* eslint-disable  func-names */
/* eslint-disable  no-console */

//var User = require("../Storage/User.js");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {




    try{


      const userId = handlerInput.requestEnvelope.session.user.userId;

      console.log("started");
      const User = await require("../Storage/UserDynamoDB.js");
      //console.log(User)
      console.log("loaded UserTest.js");

      //var result = await User.create(userId);
      //var user1  = await User.update(userId);
      // let shower1 = await User.createNewShower(userId,'1');
      // let shower2 = await User.createNewShower(userId,'2');
      // let shower3 = await User.createNewShower(userId,'3');
      // let lastShower = await User.getLastShower(userId);

      // console.log(shower1);
      // console.log(shower2);
      // console.log(shower3);
      //console.log(lastShower);


      console.log("loaded Created User");

      var speechText = "Welcome to smart shower! Just tell me when \
      you are going in the shower and I'll remember.  Or ask when when you last showered.";


    }
    catch(e){
      var speechText = "I'm sorry, I am having a problem with finding your information."
      console.error("error in LaunchRequestHandler", e);
    }


    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(true)
      .withSimpleCard('Smart Shower', speechText)
      .getResponse();


  },
};

module.exports = LaunchRequestHandler;
