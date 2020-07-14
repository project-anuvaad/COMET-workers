const queues = require('../vendors/rabbitmq/queues');

module.exports = ({ rabbitmqChannel }) => {
    
    function transcribeVideo(params) {
        return rabbitmqChannel.sendToQueue(queues.TRANSCRIBE_VIDEO_QUEUE, new Buffer(JSON.stringify(params)), { persistent: true });
    }
    
    function convertVideoToArticle(videoId) {
        return rabbitmqChannel.sendToQueue(queues.CONVERT_VIDEO_TO_ARTICLE_QUEUE, new Buffer(JSON.stringify({ videoId })), { persistent: true });
    }

    function transcribeSubvideos(params) {
        return rabbitmqChannel.sendToQueue(queues.TRANSCRIBE_SUBVIDEOS_QUEUE, new Buffer(JSON.stringify(params)), { persistent: true });
    }
    
    return {
        transcribeVideo,
        convertVideoToArticle,
        transcribeSubvideos,
    }
}