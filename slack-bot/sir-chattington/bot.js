// Import required environment variables
var env = require('node-env-file');
var axios = require('axios');
var qs = require('qs');

env(__dirname + '/.env');

// Ensure all required variables available
if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  console.log('Please ensure the app has the client id, secret, and host port.');
  process.exit(1);
}

// Import the Botkit module
var Botkit = require('botkit');

// Link the id, secret, and scopes. You can configure a large number of options
// in this section: https://botkit.ai/docs/readme-slack.html
var bot_options = {
  debug: true,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  scopes: [
    'bot',
    'chat:write:bot',
    'im:history',
    'im:read',
    'im:write',
  ],
  json_file_store: __dirname + '/.data/db/'
};

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.slackbot(bot_options);
controller.startTicking();

console.log(process.env.oauth);

// axios({
//   method: 'post',
//   url: 'https://slack.com/api/team.info',
//   data: qs.stringify({
//     'token': process.env.oauth,
//   }),
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded'
//   }
// }).then(function (result) {
//   var teamId = result.data.team.id;

//   console.log('Saving team id: ', result.data.team.id);
//   controller.storage.teams.save({
//     id: teamId
//   }, function (err) {
//     console.log(err)
//   });
// });

// axios({
//   method: 'post',
//   url: 'https://slack.com/api/chat.postMessage',
//   data: qs.stringify({
//     type: 'message',
//     channel: 'D359SVC4V',
//     text: 'Hi! What\'s your favorite number?',
//     token: process.env.botOauth
//   }),
//   headers: {
//     'Content-type': 'application/x-www-form-urlencoded'
//   }
// }).then(function (result) {
//   console.log('Response is: ', result.data);
// });

// Set up an Express-powered webserver to expose oauth and webhook endpoints
require(__dirname + '/components/express_webserver.js')(controller);

// who sign up for the app via the oauth
require(__dirname + '/components/user_registration.js')(controller);

// Send an onboarding message when a new team joins
require(__dirname + '/components/onboarding.js')(controller);

// Setup each of the triggers (where we actually build functionality)
require(__dirname + '/triggers/conversation.js')(controller);