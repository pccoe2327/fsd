const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  prn: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);