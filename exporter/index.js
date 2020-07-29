const queues = require('../vendors/rabbitmq/queues');

module.exports = ({ rabbitmqChannel }) => {

    function convertVideoToArticle({ videoId, articleId }) {
        return rabbitmqChannel.sendToQueue(queues.CONVERT_VIDEO_TO_ARTICLE_QUEUE, new Buffer(JSON.stringify({ videoId, articleId })), { persistent: true });
    }

    function exportArticleTranslation(translationExportId) {
        return rabbitmqChannel.sendToQueue(queues.EXPORT_ARTICLE_TRANSLATION, new Buffer(JSON.stringify({ translationExportId })), { persistent: true });
    }

    function archiveArticleTranslationAudios(translationExportId) {
        return rabbitmqChannel.sendToQueue(queues.ARCHIVE_ARTICLE_TRANSLATION_AUDIOS, new Buffer(JSON.stringify({ translationExportId })), { persistent: true });
    }

    function burnTranslatedArticleVideoSubtitle(translationExportId) {
        return rabbitmqChannel.sendToQueue(queues.BURN_ARTICLE_TRANSLATION_VIDEO_SUBTITLE, new Buffer(JSON.stringify({ translationExportId })), { persistent: true });
    }

    function generateTranslatedArticleSubtitles(translationExportId) {
        return rabbitmqChannel.sendToQueue(queues.GENERATE_ARTICLE_TRANSLATION_VIDEO_SUBTITLE, new Buffer(JSON.stringify({ translationExportId })), { persistent: true });
    }

    function generateVideoThumbnail(videoId) {
        return rabbitmqChannel.sendToQueue(queues.GENERATE_VIDEO_THUMBNAIL_QUEUE, new Buffer(JSON.stringify({ videoId })), { persistent: true });
    }
    function updateArticleSlideVideoSlice({ articleId, slidePosition, subslidePosition, startTime, endTime }) {
        return rabbitmqChannel.sendToQueue(queues.UPDATE_ARTICLE_SLIDE_VIDEO_SLICE, new Buffer(JSON.stringify({ articleId, slidePosition, subslidePosition, startTime, endTime })), { persistent: true });
    }
    function updateArticleVideoSpeed({ articleId, videoSpeed }) {
        return rabbitmqChannel.sendToQueue(queues.UPDATE_ARTICLE_VIDEO_SPEED, new Buffer(JSON.stringify({ articleId, videoSpeed })), { persistent: true });
    }

    function updateArticleSlideVideoSpeed({ articleId, videoSpeed, slidePosition, subslidePosition }) {
        return rabbitmqChannel.sendToQueue(queues.UPDATE_ARTICLE_SLIDE_VIDEO_SPEED, new Buffer(JSON.stringify({ articleId, videoSpeed, slidePosition, subslidePosition })), { persistent: true });
    }

    function burnTranslatedArticleVideoSubtitleAndSignlanguage(translationExportId) {
        return rabbitmqChannel.sendToQueue(queues.BURN_ARTICLE_TRANSLATION_VIDEO_SUBTITLE_AND_SIGNLANGUAGE, new Buffer(JSON.stringify({ translationExportId })), { persistent: true });
    }


    return {
        convertVideoToArticle,
        exportArticleTranslation,
        archiveArticleTranslationAudios,
        burnTranslatedArticleVideoSubtitle,
        generateTranslatedArticleSubtitles,
        generateVideoThumbnail,
        updateArticleSlideVideoSlice,
        updateArticleVideoSpeed,
        updateArticleSlideVideoSpeed,
        burnTranslatedArticleVideoSubtitleAndSignlanguage,
    }

}
