const constants = require('./const.js');

module.exports = function (controller) {

    controller.hears(constants.hears, 'direct_message,direct_mention', function (bot, message) {
        console.log('Message received, ', message);

        bot.createConversation(message, function (err, conversation) {

            // Create a path for a valid number
            conversation.addMessage({
                text: 'What a great number!',
            }, 'number');

            // Create a default path
            conversation.addMessage({
                text: 'Mmm, I don\'t think you gave me a number . . .',
                action: 'default',
            }, 'unknown');

            // Create a question
            conversation.ask('Hi! What\'s your favorite number?', [{
                    pattern: /\d/g,
                    callback: function (response, conversation) {
                        conversation.gotoThread('number');
                    },
                },
                {
                    default: true,
                    callback: function (response, conversation) {
                        conversation.gotoThread('unknown');
                    },
                }
            ]);

            conversation.activate();
        });
    });
};