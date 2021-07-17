const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [
    {
      comment: String,
      created: { type: Date, default: Date.now },
      commentedBy: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  updated: Date,
});

module.exports = mongoose.model("Post", postSchema);
