var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('student', userSchema);