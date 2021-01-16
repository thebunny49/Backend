var mongoose = require('mongoose');

var cleanSchema = mongoose.Schema({
    shopname: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Clean', cleanSchema)