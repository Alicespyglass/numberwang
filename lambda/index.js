// NPM Modules
var Alexa = require('alexa-sdk');
var OpearloAnalytics = require('opearlo-analytics');

// Intent handlers
var handlers = {

  // LaunchRequest --> GetFact
  'LaunchRequest': function () {
    this.emit('GetFact');
  },

  // GetNewFactIntent --> GetFact
  'GetNewFactIntent': function () {
    this.emit('GetFact');
  },

  // GetFact --> Pulls a Random Fact From Opearlo Analytics
  'GetFact': function () {

    // GetFact Reprompt
    var factReprompt = 'Would you like another fact?';

    // Get Opearlo Voice Content for Random Fact
    OpearloAnalytics.getVoiceContent(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, process.env.OPEARLO_API_KEY, 'random-fact', (err, data) => {

      // Random Fact
      var randomFact = data || 'I had trouble finding any facts. Please try again.';

      // Respond to User With Random Fact
      this.emit(':ask', randomFact, factReprompt);
    });
  },

  // HelpIntent
  'AMAZON.HelpIntent': function () {

    // Get Opearlo Voice Content for Help Message
    OpearloAnalytics.getVoiceContent(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, process.env.OPEARLO_API_KEY, 'help-message', (err, data) => {

      // Help Message
      var helpMessage = data || 'You can ask me for a fact.';

      // Respond to User With Help Message
      this.emit(':ask', helpMessage, helpMessage);
    });
  },

  // YesIntent --> New Fact
  'AMAZON.YesIntent': function () {
    this.emit('GetFact');
  },

  // NoIntent --> No New Fact --> StopIntent
  'AMAZON.NoIntent': function () {
    this.emit('GetFact');
  },

  // CancelIntent --> StopIntent
  'AMAZON.CancelIntent': function () {
    this.emit('StopIntent');
  },

  // StopIntent
  'AMAZON.StopIntent': function () {

    // Get Opearlo Voice Content for Help Message
    OpearloAnalytics.getVoiceContent(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, process.env.OPEARLO_API_KEY, 'goodbye-message', (err, data) => {

      // Random Goodbye Message
      var randomGoodbye = data || 'Goodbye!';

      // Record Analytics
      OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, (error, result) => {

        // Respond to User with Error Message
        this.emit(':tell', randomGoodbye);
      });
    });
  },

  // SessionEndedRequest
  'SessionEndedRequest': function () {

    // Record Analytics
    OpearloAnalytics.recordAnalytics(this.event.session.user.userId, process.env.OPEARLO_API_KEY, (error, result) => {

      console.log('SessionEndedRequest.');
    });
  },
};


// Main Lambda Event Handler
exports.handler = function (event, context, callback) {

  // Log Request
  console.log('Alexa Request: ', JSON.stringify(event)); // eslint-disable-line no-console

  // Opearlo Analytics - Intialise on New Session
  if (event.session.new) {
    OpearloAnalytics.initializeAnalytics(process.env.OPEARLO_USER_ID, process.env.OPEARLO_VOICE_APP_NAME, event.session);
  }

  // // Opearlo Analytics - Track Launch Requests
  if (event.request.type === 'LaunchRequest') {
    OpearloAnalytics.registerVoiceEvent(event.session.user.userId, 'LaunchRequest');
  }

  // Opearlo Analytics - Track Intent Requests
  if (event.request.type === 'IntentRequest') {
    OpearloAnalytics.registerVoiceEvent(event.session.user.userId, 'IntentRequest', event.request.intent);
  }

  // Create Alexa-SDK Object
  var alexa = Alexa.handler(event, context);

  // Alexa-SDK Properties
  alexa.appId = process.env.APP_ID || ''; // TODO: Set App Id as Environment Variable

  // Register Handlers
  alexa.registerHandlers(handlers);

  // Process Request
  alexa.execute();
};
