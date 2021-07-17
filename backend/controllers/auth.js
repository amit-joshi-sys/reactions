const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { sendEmail } = require("../helpers");
const dotenv = require("dotenv");
dotenv.config();

exports.signUp = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return res.status(403).json({
      error: "User already exists",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({
    message: "Sign Up successfull!! Please Sign In.",
  });
};

exports.signIn = (req, res) => {
  //find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user)
      return res.status(401).json({
        error: "User Does not exist please Sign Up",
      });
    //if user is not authenticated
    if (!user.authenticate(password))
      return res.status(401).json({
        error: "Email or password do not match",
      });
    //generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //parse token with cookie with expiry date
    res.cookie("token", token, { expire: new Date() + 9999 });
    // return token and user to front end client
    const { email, _id, name } = user;
    return res.json({ token, user: { email, _id, name } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Signout Successfull!!" });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No Body Request" });
  if (!req.body.email)
    return res.status(400).json({ message: "No Email In The Body" });

  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({ error: "User Does Not Exist" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const emailData = {
      from: "noreply@node-react.com",
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        sendEmail(emailData);
        return res.json({
          message: `Email Has Been Sent To ${email}. Follow The Instructions To Reset Password`,
        });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, password } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
    // if err or no user
    if (err || !user)
      return res.status("401").json({
        error: "Invalid Link!",
      });

    user.password = password;
    user.resetPasswordLink = "";
    user.updated = Date.now();
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      } else {
        console.log(result);
        return res.json({
          message: `Great! Now you can login with your new password.`,
        });
      }
    });
  });
};
