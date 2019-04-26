var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    idNumber: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;