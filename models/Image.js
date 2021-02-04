const mongoose = require('mongoose');


const _image = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }
})

const Image = mongoose.model('Image', _image)
module.exports = Image