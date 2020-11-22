const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
  },
  isConfirmed: {
    type: Boolean,
  }
});

module.exports = User = mongoose.model("users", UserSchema);