const mongoose = require("mongoose");
const uuid = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  about: {
    type: String,
    trim: true,
  },
  following: [{ type: ObjectId, ref: "User" }],
  followers: [{ type: ObjectId, ref: "User" }],
  timelinePhoto: {
    data: Buffer,
    contentType: String,
  },

  hashed_password: {
    type: String,
    required: true,
  },

  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  resetPasswordLink: {
    data: String,
    default: "",
  },
  updated: Date,
});

//set a virtual field for plain password
userSchema
  .virtual("password")
  .set(function (password) {
    //create temporary variable called _password
    this._password = password;
    //generate timeStamps
    this.salt = uuid.v1();
    //hash the password
    this.hashed_password = this.encryPassword(password);
  })
  .get(function () {
    return this.password;
  });

//create encryPassword method in the userSchema
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryPassword(plainText) === this.hashed_password;
  },
  encryPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
