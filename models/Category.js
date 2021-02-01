const mongoose = require('mongoose');

const _category = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    }
})

const Category = mongoose.model('Category', _category)
module.exports = Category