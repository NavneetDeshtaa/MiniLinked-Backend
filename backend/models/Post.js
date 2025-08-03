const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    image: { type: String }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    visibility: {
      type: String,
      enum: ['public', 'private', 'connections'],
      default: 'public'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
