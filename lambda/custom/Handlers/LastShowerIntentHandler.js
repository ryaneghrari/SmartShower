/* eslint-disable  func-names */
/* eslint-disable  no-console */

const handler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'LastShowerIntent';
  },
  async handle(handlerInput) {

    const userId = handlerInput.requestEnvelope.session.user.userId;

    try{
    
      var User = await require("../Storage/User.js");

      var lastShower = await User.getLastShower(userId);


      if(lastShower === "0 showers"){
        var speechText = "I do not have any history of you showering.  You can tell me you are going in the shower and I will remember."
      }
      else{
        //// TODO: Get timezone from alexa device
        const TIMEZONE = (4 * 60 * 60 * 1000);

        const now = new Date();
        const adjNow = (now.getTime()) - TIMEZONE;

        const diff = adjNow - lastShower.getTime();

        var speechText = getResponse(diff)
      }

    }
    catch(e){

      console.error(e)
      var speechText = "I'm not sure, I am having an issue.";

    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Smart Shower', speechText)
      .withShouldEndSession(true)
      .getResponse();


  }
};

function getResponse(msDiff){
  var secDiff = msDiff / 1000;
  var minDiff = secDiff / 60;
  var hourDiff = minDiff / 60;
  var dayDiff = hourDiff / 24;

  console.log(secDiff,minDiff,hourDiff,dayDiff)

  if(dayDiff > 3){
    return "It's been over three days, please shower!"
  }
  else if(dayDiff > 2){
    return "Its been over two days, it's time to shower"
  }
  else if(dayDiff > 1){
    return "You showered yesterday"
  }
  else if(hourDiff > 1){
    return "You showered " + Math.floor(hourDiff) + " hours ago."
  }
  else if(minDiff > 1){
    return "You told me you started a shower " + Math.floor(minDiff) + " minutes ago."
  }
  else{
    //// TODO: Grab the second to last shower in case they want that instead
    return "Just now!"
  }



  return "working on it";
}

module.exports = handler;
