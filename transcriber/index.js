
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
    
    function transcribeVideo(params) {
        return rabbitmqChannel.sendToQueue(queues.TRANSCRIBE_VIDEO_QUEUE, new Buffer(JSON.stringify(params)), { persistent: true });
    }
    
    function convertVideoToArticle(videoId) {
        return rabbitmqChannel.sendToQueue(queues.CONVERT_VIDEO_TO_ARTICLE_QUEUE, new Buffer(JSON.stringify({ videoId })), { persistent: true });
    }
    
    return {
        transcribeVideo,
        convertVideoToArticle,
    }
}