var debug = require('debug')('botkit:incoming_webhooks');

module.exports = function(webserver, controller) {

    debug('Configured /slack/receive url');
    webserver.post('/slack/receive', function(req, res) {

        // NOTE: we should enforce the token check here
        console.log('Slack message received.');

        // respond to Slack that the webhook has been received.
        res.status(200);

        // Now, pass the webhook in to be processed
        controller.handleWebhookPayload(req, res);
    });
}
