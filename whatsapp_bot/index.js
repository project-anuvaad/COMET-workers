
const rabbitmqService = require('../vendors/rabbitmq');
const queues = require('../vendors/rabbitmq/queues');

module.exports = (RABBITMQ_SERVER) => {

    let rabbitmqChannel;
    rabbitmqService.createChannel(RABBITMQ_SERVER, (err, channel) => {
        if (err) {
            throw err;
        }
        rabbitmqChannel = channel;
    });

    function whatsappNotifyUserVideoProofreadingReady({ videoId }) {
        return rabbitmqChannel.sendToQueue(queues.WHATSAPP_NOTIFY_USER_VIDEO_PROOFREADING_READY, new Buffer(JSON.stringify({ videoId })), { persistent: true });
    }
    
    return {
       whatsappNotifyUserVideoProofreadingReady 
    }
}