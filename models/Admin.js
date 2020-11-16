const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
});

module.exports = Admin = mongoose.model("admins", AdminSchema);