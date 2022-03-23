var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    reciver: {
        type: String,
        // required: true
    },
    text: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        // required: true
    },
    subTopic: {
        type: String,
        // required: true
    },
    studentName: {
        type: String
    },
    videoId: {
        type: String,
        // required: true
    },
    studentId: {
        type: String,
    },
    profId: {
        type: String,
    },
    type: {
        type: String,
    },
    pausedTime: {
        type:String
    },
    
    date: {
        type: Date,
        // required: true
    },
    status: {
        type: String,
        required: true
    }, audioData: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Messages', userSchema);
