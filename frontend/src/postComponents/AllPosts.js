import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isOriginalUser } from "../helpers/user";
import { deletePost } from "../postHelpers/post";
import CommentButton from "./CommentButton";
import Like from "./Like";
import "./postStyles/allPosts.css";
import Unlike from "./Unlike";

const AllPosts = (props) => {
  let posts = props.posts;
  const [deleteOption, setDeleteOption] = useState(false);

  const postFallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg";
  };

  const postDeleteHandler = (postID) => {
    deletePost(postID).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.deletePost();
        setDeleteOption((deleteOption) => !deleteOption);
      }
    });
  };

  const enableDeleteWindow = () => {
    setDeleteOption((deleteOption) => !deleteOption);
  };

  const postImage = (e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
  };

  return (
    <>
        <div id="post-observe" className="post-container">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-content" key={post._id}>
                <div className="poster-info">
                  <Link to={`/user/${post.postedBy._id}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`}
                      className="poster-photo"
                      alt={post.postedBy.name}
                      onError={postFallbackImage}
                    />
                  </Link>
                  <div className="poster-name">
                    <Link to={`/user/${post.postedBy._id}`} className="poster">
                      <h4>{post.postedBy.name}</h4>
                    </Link>
                    <p>{new Date(post.created).toDateString()}</p>
                  </div>
                  {isOriginalUser(post.postedBy._id) ? (
                    <>
                      <i
                        className="fas fa-ellipsis-h"
                        onClick={enableDeleteWindow}
                      ></i>
                      {deleteOption ? (
                        <div className="options-window">
                          <div className="delete-option">
                            <button
                              className="delete-button"
                              onClick={() => postDeleteHandler(post._id)}
                            >
                              <i className="fas fa-trash-alt fa-lg"></i>
                              Delete
                            </button>
                            <p>This Will Permanently Delete Your Post</p>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
                <Link to={`/post/${post._id}`} className="post-details">
                  <div className="post-body-content">{post.body}</div>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                    alt={post.postedBy.name}
                    className="post-image"
                    onError={postImage}
                  />
                </Link>
                <div className="like-info">
                  <p>
                    <i
                      className="fas fa-thumbs-up fa-lg"
                      style={{ color: "#1e88e5" }}
                    ></i>
                    {post.likes.length} Likes
                  </p>
                </div>
                <div className="like-unlike">
                  <Like postId={post._id} likePost={props.likePost} />
                  <Unlike postId={post._id} unlikePost={props.unlikePost} />
                  <CommentButton postId={post._id} />
                </div>
              </div>
            ))
          ) : (
            <div className="no-message-container">
              <h3 className="no-message">User Don't Have Any Posts Yet!</h3>
            </div>
          )}
        </div>
    </>
  );
};

export default AllPosts;
