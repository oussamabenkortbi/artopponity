const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    embed: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('videos', Video);