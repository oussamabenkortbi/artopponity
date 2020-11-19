const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArtistSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    fullName: {
        type: String,
    },
    dicipline: {
        type: String,
    },
    categories: {
        type: String,
    },
    description: {
        type: String,
    },
    wilaya: {
        type: String,
    },
    isValid: {
        type: Boolean,
        required: true
    },
    eventType: {
        type: Object,
    }
});

module.exports = Artist = mongoose.model("artists", ArtistSchema);

/*
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
    Decimal128
    Map
    Schema
*/