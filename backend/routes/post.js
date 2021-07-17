const express = require("express");
const { requireSignIn } = require("../controllers/auth");
const router = express.Router();
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  deletePost,
  isPoster,
  updatePost,
  postPhoto,
  likePost,
  unlikePost,
  getPostDetails,
  comment,
  uncomment,
} = require("../controllers/post");
const { userById, hasAuthorized } = require("../controllers/user");
const { createPostValidator } = require("../validator");

router.get("/posts", requireSignIn, getPosts);
router.get("/post/:postId", requireSignIn, getPostDetails);

router.put("/post/likes", requireSignIn, likePost);
router.put("/post/unlikes", requireSignIn, unlikePost);

router.put("/post/comment", requireSignIn, comment);
router.put("/post/uncomment", requireSignIn, uncomment);

router.get("/posts/by/:userId", requireSignIn, postsByUser);

router.post(
  "/post/new/:userId",
  requireSignIn,
  hasAuthorized,
  createPost,
  createPostValidator
);

router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);

router.get("/post/photo/:postId", postPhoto);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
