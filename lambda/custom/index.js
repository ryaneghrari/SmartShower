/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa                       = require('ask-sdk-core')
const LaunchRequestHandler        = require("./Handlers/LaunchRequestHandler.js")
const HelpIntentHandler           = require("./Handlers/BuiltIn/HelpIntentHandler.js")
const CancelAndStopIntentHandler  = require("./Handlers/BuiltIn/CancelAndStopIntentHandler.js")
const SessionEndedRequestHandler  = require( "./Handlers/SessionEndedRequestHandler")
const ErrorHandler                = require("./Handlers/ErrorHandler.js")

const StartShowerIntentHandler    = require("./Handlers/StartShowerIntentHandler.js")
const LastShowerIntentHandler     = require("./Handlers/LastShowerIntentHandler.js")

// const credentials = {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// }
//
// if(process.env.AWS_ACCESS_KEY_ID){
//   var dynasty = require('dynasty')(credentials);
// }
// else{
//
//   var dynasty = require('dynasty')(credentials, 'localhost:8000');
// }
//
// users = dynasty.table('Users');
//
// var promise = users.find('1');
//
// promise.then(function(user){
//   console.log(user)
// })

const skillBuilder = Alexa.SkillBuilders.custom()


exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    StartShowerIntentHandler,
    LastShowerIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
