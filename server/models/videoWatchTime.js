var mongoose = require('mongoose')

const videoWatchTime = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true
    },
    profId: {
        type: String,
        // required: true
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('watchTime', videoWatchTime);