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
    
    function processRecordedAudioViaApi({ url, fileStream, outputFormat }) {
        return new Promise((resolve, reject) => {
            let req;
            if (url) {
                req = superagent.post(`${AUDIO_PROCESSOR_API_ROOT}/process_audio`, { url, outputFormat })
            } else if (fileStream) {
                req = superagent.post(`${AUDIO_PROCESSOR_API_ROOT}/process_audio`)
                .attach('file', fileStream)
                .field('outputFormat', outputFormat);
            }
                
            req.then((res) => {
                    resolve(res.body);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    function speedAudioViaApi({ url, fileStream, speed }) {
        return new Promise((resolve, reject) => {
            let req;
            if (url) {
                req = superagent.post(`${AUDIO_PROCESSOR_API_ROOT}/audioSpeed`, { url, speed })
            } else if (fileStream) {
                req = superagent.post(`${AUDIO_PROCESSOR_API_ROOT}/audioSpeed`)
                .attach('file', fileStream)
                .field('speed', speed);
            }
                
            req.then((res) => {
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
        speedAudioViaApi,
    }
}