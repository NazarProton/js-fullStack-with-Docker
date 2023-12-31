const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    completedMeetings: {
      type: Number,
    },
    rate: Number,
    image: String,
    sex: { type: String, enum: ['male', 'female', 'other'] },
    profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', schema);
