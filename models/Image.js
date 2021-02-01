const mongoose = require('mongoose');


const _image = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true,
    }
})

const Image = mongoose.model('Image', _image)
module.exports = Image