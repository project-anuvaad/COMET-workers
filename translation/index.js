
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
    
    function translateArticleText(params) {
        return rabbitmqChannel.sendToQueue(queues.TRANSLATE_ARTICLE_TEXT_QUEUE, new Buffer(JSON.stringify(params)), { persistent: true });
    }
    
    
    return {
        translateArticleText,
    }
}