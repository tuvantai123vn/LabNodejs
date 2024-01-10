"use strict"

const mongoose = require('mongoose');

const connectString = 'mongodb+srv://admin:admin@node-products.o0dvpt9.mongodb.net/node-complete';

mongoose.connect(connectString).then( _ => {
    console.log('Connected MongoDB Success');
}).catch(err => console.log("Error Connect"));

if(1 === 0) {
    mongoose.set('debug', true);
    mongoose.set('debug', {color: true})
}
module.exports = mongoose;