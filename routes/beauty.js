var mongoose = require('mongoose');

var beautySchema = mongoose.Schema({
    shopname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Beauty', beautySchema)