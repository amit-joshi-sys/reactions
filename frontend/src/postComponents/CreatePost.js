import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
import { createPost } from "../postHelpers/post";
import "./postStyles/createPost.css";

const CreatePost = (props) => {
  const { body, formdata, photo } = props.post;
  const [tempFileUrl, setTempFileUrl] = useState(null);

  useEffect(() => {
    if (photo) {
      setTempFileUrl(URL.createObjectURL(photo));
    }
  }, [photo, props.post]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    if (formdata) {
      formdata.set(name, value);
    }
    props.setPost({ ...props.post, [name]: value });
  };

  const postHandler = () => {
    props.uploadPost(createPost);
    setTempFileUrl(null);
  };

  const disabledUntil = body === "";

  const userId = isAuthenticated() ? isAuthenticated().user._id : null;
  const userName = isAuthenticated() ? isAuthenticated().user.name : null;

  const fallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg";
  };

  return (
    <>
      <div className="create-post-container">
        <div className="post-body">
          <Link to={`/user/${userId}`}>
            <img
              src={`${process.env.REACT_APP_API_URL}/user/photo/${userId}`}
              className="poster-photo"
              alt={userName}
              onError={fallbackImage}
            />
          </Link>
          <textarea
            value={body}
            onChange={handleChange("body")}
            type="text"
            placeholder="What's On Your Mind"
          />
        </div>
        <div className="post-image-upload">
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={handleChange("photo")}
              accept="images/*"
            />
            <i className="fad fa-image fa-lg"></i>
            Photo
          </label>
          {tempFileUrl ? (
            <img src={tempFileUrl} alt="post" className="create-post-photo" />
          ) : null}
        </div>
        <button
          className="create-post-button"
          onClick={postHandler}
          disabled={disabledUntil}
        >
          Post
        </button>
      </div>
    </>
  );
};

export default CreatePost;
