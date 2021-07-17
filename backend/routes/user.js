const express = require("express");
const { requireSignIn } = require("../controllers/auth");
const {
  allUsers,
  userById,
  getUser,
  updateUser,
  hasAuthorized,
  deleteUser,
  userPhoto,
  timelinePhoto,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
  findPeople,
  searchUser,
} = require("../controllers/user");
const router = express.Router();

router.put("/user/follow", requireSignIn, addFollowing, addFollower);
router.put("/user/unfollow", requireSignIn, removeFollowing, removeFollower);

router.get("/users", requireSignIn, allUsers);
router.get("/user/search/:name", requireSignIn, searchUser);
router.get("/user/:userId", requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, hasAuthorized, updateUser);
router.delete("/user/:userId", requireSignIn, hasAuthorized, deleteUser);

//photo route
router.get("/user/photo/:userId", userPhoto);
router.get("/user/timelinephoto/:userId", timelinePhoto);

//who to follow
router.get("/user/findpeople/:userId", requireSignIn, findPeople);

router.param("userId", userById);
module.exports = router;
