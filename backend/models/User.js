const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    title: { type: String, default: "Aspiring Developer" },
    location: { type: String, default: "Unknown" },
    profilePic: { type: String, default: "" }, // URL
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
