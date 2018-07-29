/* eslint-disable  func-names */
/* eslint-disable  no-console */

var FunnyQuotes = [
  "splish splash!",
  "have fun!",
  "don't forget to wash your booty hole!",
  "cool!"
]

const DAYS = {
  SUN : "sunday",
  MON : "monday",
  TUE : "tuesday",
  WED : "wednesday",
  THU : "thursday",
  FRI : "friday",
  SAT : "saturday",
}

const handler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StartShowerIntent';
  },
  async handle(handlerInput) {


    var utcDate = new Date();

    //// TODO: Get timezone from alexa device
    const TIMEZONE = (4 * 60 * 60 * 1000);

    var adjTime = utcDate.getTime() - TIMEZONE;

    try{

      const userId = handlerInput.requestEnvelope.session.user.userId;

      const User = await require("../Storage/User.js");

      var result = await User.updateShower(userId,{ date : adjTime });

      var speechText = "Okay, I will remember, " + FunnyQuotes[Math.floor(Math.random()*FunnyQuotes.length)];
    }
    catch(e){

      var speechText = "Have fun, but something went wrong so I won't remember";
      console.error(e);
    }


    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Smart Shower', speechText)
      .withShouldEndSession(true)
      .getResponse();


  }
};

module.exports = handler;
