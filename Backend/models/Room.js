const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rooms = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: Number,
        required: true
    },
    roomNumbers :[ {
        type: Number
    }],
})

module.exports = mongoose.model('Rooms', Rooms)