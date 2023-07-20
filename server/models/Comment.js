const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    content: { type: String, required: true },
    pageId: { type: String, ref: 'User', required: true },
    userId: { type: String, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

module.exports = model('Comment', schema);
