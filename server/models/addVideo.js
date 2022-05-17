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
        type: Array,
        // required: true
    },
    time: {
        type: Number,
    },
    videoLink: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    videoUploader: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Video', addVideo);
