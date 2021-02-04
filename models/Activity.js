const mongoose = require('mongoose');


const _activity = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    isPopular: {
        type: Boolean
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }
})


const Activity = mongoose.model('Activity', _activity)
module.exports = Activity