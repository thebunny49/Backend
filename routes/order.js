var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    Description: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('order', orderSchema)