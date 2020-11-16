const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Prestation = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    time: {
        type: Number,
    },
    price: {
        type: Number,
    },
    artists: {
        type: Number,
    },
    space: {
        type: Number,
    },
    prepareTime: {
        type: Number,
    },
});

module.exports = mongoose.model('prestations', Prestation);