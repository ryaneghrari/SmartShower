/* eslint-disable  func-names */
/* eslint-disable  no-console */

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {

    try{

      const userId = handlerInput.requestEnvelope.session.user.userId;

      const User = await require("../Storage/User.js");

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
