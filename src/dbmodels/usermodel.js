const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  contactNumber: {
    type: String,
    match: [/^\d{10}$/, "Please use a valid contact number."],
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  profilePicture: {
    type: String, // URL to the profile picture
  },
  bio: {
    type: String,
    trim: true,
  }
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = User;
