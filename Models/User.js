const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  Name: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Polls: [{ type: Schema.Types.ObjectId, ref: "Poll" }],
  createdAt: {
    type: Date,
    unique: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
