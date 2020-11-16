const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    wilaya: {
        type: String,
    },
});

module.exports = Client = mongoose.model("clients", ClientSchema);
