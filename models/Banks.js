const mongoose = require('mongoose');


const _banks = new mongoose.Schema({
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    logoURL : {
        type: String,
    }
})


const Banks = mongoose.model('Banks', _banks)
module.exports = Banks