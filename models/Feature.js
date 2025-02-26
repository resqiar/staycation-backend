const mongoose = require('mongoose');

const _feature = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }
})

const Feature = mongoose.model('Feature', _feature)
module.exports = Feature