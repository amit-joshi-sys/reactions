const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const { userSignUpValidator, passwordResetValidator } = require("../validator");

const { userById } = require("../controllers/user");

const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

// forgot password and reset routed
router.put("/reset-password", passwordResetValidator, resetPassword);
router.put("/forgot-password", forgotPassword);

//any route containing userId encountered this method will run
router.param("userId", userById);
module.exports = router;
