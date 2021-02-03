const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const _category = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    itemId : {
        type: ObjectId,
    }
})

const Category = mongoose.model('Category', _category)
module.exports = Category