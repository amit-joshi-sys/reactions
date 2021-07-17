const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments", "text created")
    .populate("comments.commentedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error: "Post not found",
        });
      }
      req.post = post;
      next();
    });
};

exports.getPosts = async (req, res) => {
  const currentPage = req.query.page ? req.query.page : 1;
  const perPage = 5;
  const posts = await Post.find()
    .countDocuments()
    .then((count) => {
      let totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .populate("postedBy", "_id name")
        .populate("comments", "text created")
        .populate("commentedBy", "_id name")
        .select("_id body created likes")
        .limit(perPage)
        .sort({ created: "desc" });
    })
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

exports.getPostDetails = (req, res) => {
  const post = req.post;
  post.photo = undefined;
  return res.json(post);
};

exports.createPost = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    let post = new Post(fields);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  });
};

exports.postsByUser = async (req, res) => {
  const currentPage = req.query.page;
  const perPage = 5;
  const posts = await Post.find({ postedBy: req.profile._id })
    .countDocuments()
    .then((count) => {
      let totalItems = count;
      return Post.find({ postedBy: req.profile._id })
        .skip((currentPage - 1) * perPage)
        .populate("postedBy", "_id name")
        .select("_id body created likes")
        .limit(perPage)
        .sort({ created: "desc" })
        .exec((err, posts) => {
          if (err)
            return res.status(400).json({
              error: err,
            });
          res.json(posts);
        });
    });
};

exports.isPoster = (req, res, next) => {
  let poster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
  if (!poster) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};

exports.deletePost = (req, res) => {
  const post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Successfully deleted the post",
    });
  });
};

exports.updatePost = (req, res) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  post.save((err, updatedPost) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(updatedPost);
  });
};

exports.postPhoto = (req, res, next) => {
  if (req.post.photo.data) {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
  }
  next();
};

exports.likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

exports.unlikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.body.userId } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

exports.comment = (req, res) => {
  let comment = req.body.comment;
  comment.commentedBy = req.body.userId;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("comments.commentedBy", "_id name")
    .populate("commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

exports.uncomment = (req, res) => {
  let comment = req.body.comment;

  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { comments: { comment: comment } } },
    { new: true }
  )
    .populate("comments.commentedBy", "_id name")
    .populate("commentedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    });
};
