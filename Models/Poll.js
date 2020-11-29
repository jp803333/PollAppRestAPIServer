const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = Schema({
  Question: {
    type: String,
    required: true,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  Options: [
    {
      value: String,
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    unique: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("Poll", pollSchema);
