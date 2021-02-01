const mongoose = require('mongoose');



const _booking = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    itemId: [{
        _id: {
            type: mongoose.Types.ObjectId,
            ref: "Item",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        night: {
            type: Number,
            required: true,
        }
    }],
    memberId: [{
        type: mongoose.Types.ObjectId,
        ref: "Member",
    }],
    BankId: [{
        type: mongoose.Types.ObjectId,
        ref: "Banks",
    }],
    proofPaymentImg: {
        type: String,
        required: true,
    },
    bankAccount: {
        type: String,
        required: true,
    },
    bankAccountHolder: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})


const Booking = mongoose.model('Booking', _booking)
module.exports = Booking