const superagent = require('superagent');
const rabbitmqService = require('../vendors/rabbitmq');
const queues = require('../vendors/rabbitmq/queues');


module.exports = ({ RABBITMQ_SERVER, AUDIO_PROCESSOR_API_ROOT }) => {

    let audioProcessorChannel;
    if (!audioProcessorChannel) {
        console.log('####### Starting audio processor channel #######');
        rabbitmqService.createChannel(RABBITMQ_SERVER, (err, ch) => {
            if (err) {
                console.log('error creating channel for exporter', err);
            } else if (ch) {
                audioProcessorChannel = ch;
                console.log('Connected to rabbitmq audio processor server successfully');
            }
        })
    }
    
    function processNoiseCancellationVideo(identifier) {
        audioProcessorChannel.sendToQueue(queues.PROCESS_NOISECANCELLATIONVIDEO_AUDIO_QUEUE, new Buffer(JSON.stringify(identifier)), { persistent: true });
    }
    
    function processRecordedAudioViaApi({ url, outputFormat }) {
        return new Promise((resolve, reject) => {
            superagent.post(`${AUDIO_PROCESSOR_API_ROOT}/process_audio`, { url, outputFormat })
                .then((res) => {
                    resolve(res.body);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
    
    return {
        processRecordedAudioViaApi,
        processNoiseCancellationVideo,
    }
}