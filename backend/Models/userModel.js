const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "placeholder.jpg"
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  resetToken: String,
  tokenExpireTime: Date,
},
  { timestamps: true });

module.exports = mongoose.model("User", userSchema);
