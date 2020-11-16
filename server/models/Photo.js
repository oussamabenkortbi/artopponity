const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('photos', Photo);