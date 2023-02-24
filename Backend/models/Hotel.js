const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rooms = require('../models/Room')
const Hotel = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Hotel', 'Apartments', 'Resodts', 'Villas', 'Cabins'],
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distance : {
        type: String,
        required: true
    },
    photos : [{
        type: String,
    }],
    desc : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        min: 0,
        max: 5,
    },
    featured : {
        type: Boolean,
        required: true
    },
    rooms : {
        type: Array,
        ref:'Rooms',
        required: true
    },
})
module.exports = mongoose.model('Hotel', Hotel)