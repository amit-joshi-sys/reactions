import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { isAuthenticated } from "../../helpers/auth";
import CommentInput from "../../postComponents/CommentInput";
import CommentList from "../../postComponents/CommentList";
import CreateComment from "../../postComponents/CreateComment";
import Like from "../../postComponents/Like";
import Unlike from "../../postComponents/Unlike";
import { postDetails } from "../../postHelpers/post";
import "./styles/postDetails.css";

const PostDetails = ({ history }) => {
  const { postId } = useParams();
  const [post, setPost] = useState("");
  const [postLiked, setPostLiked] = useState(false);
  const [postUnliked, setPostUnliked] = useState(false);
  const [commentInput, setCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentDeleted, setCommentDeleted] = useState(false);

  const toggleShowInput = () => {
    setCommentInput((commentInput) => !commentInput);
  };

  const likePost = () => {
    setPostLiked((postLiked) => !postLiked);
  };
  const unlikePost = () => {
    setPostUnliked((postUnliked) => !postUnliked);
  };

  const changeComment = (value) => {
    setCommentText(value);
  };
  const changeCommentDeleted = () => {
    setCommentDeleted(true);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/signin");
    }
  }, [history]);

  useEffect(() => {
    postDetails(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let post = data;
        setPost(post);
        setCommentDeleted(false);
      }
    });
  }, [postId, postLiked, postUnliked, commentText, commentDeleted]);

  const postImage = (e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
  };
  const posterFallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg";
  };
  return (
    <>
      {post ? (
        <div className="post-details-container">
          <div className="post-details-content">
            <div className="post-info">
              <img
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={post.postedBy.name}
                className="post-details-image"
                onError={postImage}
              />
            </div>
          </div>
          <div className="post-interaction-container">
            <div className="poster-info">
              <Link to={`/user/${post.postedBy._id}`}>
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${post.postedBy._id}`}
                  className="poster-photo"
                  alt={post.postedBy.name}
                  onError={posterFallbackImage}
                />
              </Link>
              <div className="poster-name">
                <Link to={`/user/${post.postedBy._id}`} className="poster">
                  <h4>{post.postedBy.name}</h4>
                </Link>
                <p>{new Date(post.created).toDateString()}</p>
              </div>
            </div>
            <div className="post-body-details">{post.body}</div>
            <div className="like-info">
              <>
                <p>
                  <i
                    className="fas fa-thumbs-up fa-lg"
                    style={{ color: "#1e88e5" }}
                  ></i>
                  {post.likes.length} Likes
                </p>
                <p>
                  <i className="fal fa-comment-lines fa-lg"></i>
                  {post.comments.length} Comments
                </p>
              </>
            </div>
            <div className="like-unlike">
              <Like postId={post._id} likePost={likePost} />
              <Unlike postId={post._id} unlikePost={unlikePost} />
              <CreateComment toggleShowInput={toggleShowInput} />
            </div>
            {commentInput ? (
              <CommentInput
                commentText={commentText}
                postId={postId}
                changeComment={changeComment}
                toggleShowInput={toggleShowInput}
              />
            ) : null}
            <CommentList
              comments={post.comments}
              posterInfo={post.postedBy._id}
              postId={postId}
              changeCommentDeleted={changeCommentDeleted}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PostDetails;
