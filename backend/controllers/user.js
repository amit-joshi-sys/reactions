const User = require("../models/user");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user) {
        res.status(401).json({
          error: "User not found",
        });
      }

      req.profile = user; //adds profile object in req
      next();
    });
};

exports.hasAuthorized = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized)
    return res.status(403).json({
      error: "User is not authorized to make changes!",
    });
  next();
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(400).json({ err });
    res.json({ users });
  }).select("name email _id updated created");
};

exports.getUser = (req, res) => {
  const { name, email, _id, about, created, updated, following, followers } =
    req.profile;
  return res.json({
    name,
    email,
    about,
    _id,
    created,
    updated,
    followers,
    following,
  });
};

exports.updateUser = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo Could not be uploaded!!",
      });
    }
    if (fields.password) {
      return res.status(400).json({ error: "Password Can't be changed" });
    }
    let user = req.profile;
    user = _.extend(user, fields);
    user.updated = Date.now();

    if (files.profilePhoto) {
      user.profilePhoto.data = fs.readFileSync(files.profilePhoto.path);
      user.profilePhoto.contentType = files.profilePhoto.type;
    } else if (files.timelinePhoto) {
      user.timelinePhoto.data = fs.readFileSync(files.timelinePhoto.path);
      user.timelinePhoto.contentType = files.timelinePhoto.type;
    }
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.profilePhoto.data) {
    res.set("Content-Type", req.profile.profilePhoto.contentType);
    return res.send(req.profile.profilePhoto.data);
  }
  next();
};

exports.timelinePhoto = (req, res, next) => {
  if (req.profile.timelinePhoto.data) {
    res.set("Content-Type", req.profile.timelinePhoto.contentType);
    return res.send(req.profile.timelinePhoto.data);
  }
  next();
};

exports.deleteUser = (req, res) => {
  let user = req.profile;
  user.remove((err) => {
    if (err)
      return res.status(400).json({
        error: err,
      });
    res.json({
      message: `Your account: ${user.email} has been deleted`,
    });
  });
};

exports.addFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    });
};

exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unfollowId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      result.hashed_password = undefined;
      result.salt = undefined;
      res.json(result);
    });
};

exports.findPeople = async (req, res) => {
  const currentPage = req.query.page;
  const perPage = 15;
  let following = req.profile.following;
  following.push(req.profile._id);
  //$nin for not including the ids
  const user = await User.find({ _id: { $nin: following } })
    .countDocuments()
    .then((count) => {
      let totalCount = count;
      return User.find({ _id: { $nin: following } }, (err, users) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        res.json(users);
      })
        .select("name _id")
        .limit(perPage);
    });
};

exports.searchUser = (req, res) => {
  const regex = new RegExp(req.params.name, "i");

  User.find({ name: regex }, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(result);
  }).select("name _id");
};
