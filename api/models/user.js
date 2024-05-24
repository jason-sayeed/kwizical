const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  score: { type: Number, default: 0},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
