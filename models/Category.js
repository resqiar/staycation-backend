const mongoose = require('mongoose');

const _category = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    itemId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
})

const Category = mongoose.model('Category', _category)
module.exports = Category