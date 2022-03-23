var mongoose = require('mongoose')

const addVideo = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true
    },
    typeOfVideo: {
        type: String,
        required: true
    },
    subTopic: {
        type: String,
        // required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Video', addVideo);
