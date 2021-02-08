var mongoose = require('mongoose');

var cleanSchema = mongoose.Schema({
    shopname: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Clean', cleanSchema)