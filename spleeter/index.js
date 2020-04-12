
const rabbitmqService = require('../vendors/rabbitmq');
const queues = require('../vendors/rabbitmq/queues');

module.exports = RABBITMQ_SERVER => {

    let rabbitmqChannel;
    rabbitmqService.createChannel(RABBITMQ_SERVER, (err, channel) => {
        if (err) {
            throw err;
        }
        rabbitmqChannel = channel;
    });
    
    function extractVideoBackgroundMusic({ id, url }) {
        return rabbitmqChannel.sendToQueue(queues.EXTRACT_VIDEO_BACKGROUND_MUSIC_QUEUE, new Buffer(JSON.stringify({ id, url })), { persistent: true });
    }
    
    return {
        extractVideoBackgroundMusic
    }
}