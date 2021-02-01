const mongoose = require('mongoose');


const _item = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "Indonesia",
    },
    desc: {
        type: String,
        required: true,
    },
    isPopular: {
        type: Boolean,
    },
    imgId: [{
        type: mongoose.Types.ObjectId,
        ref: "Image",
    }],
    featureId: [{
        type: mongoose.Types.ObjectId,
        ref: "Feature"
    }],
    activityId: [{
        type: mongoose.Types.ObjectId,
        ref: "Activity"
    }]
})

const Item = mongoose.model('Item', _item)
module.exports = Item