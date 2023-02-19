const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'Users'
    },
    hotel: {
        type: String,
        required: true,
        ref: 'Hotels'
    },
    room: {
        type: String,
        required: true,
        ref: 'Rooms'
    },
    datestart: {
        type: Date,
        required: true
    },
    dateEnd : {
        type: Date,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    payment : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    
})
module.exports = mongoose.model('Transaction', Transaction)