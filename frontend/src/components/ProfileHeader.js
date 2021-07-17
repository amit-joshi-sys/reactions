import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
import { isOriginalUser } from "../helpers/user";
import AllPosts from "../postComponents/AllPosts";
import { getPostsByUser } from "../postHelpers/post";
import EditUser from "./EditUser";
import FollowButton from "./FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import Loader from "./Loader";
import "./styles/profileHeader.css";
import UnfollowButton from "./UnfollowButton";
import UserInfo from "./UserInfo";

const ProfileHeader = (props) => {
  const [showInfo, setShowInfo] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollower, setShowFollower] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [timelineURL, setTimelineURL] = useState("");
  const [posts, setPosts] = useState("");
  const [postDeleted, setPostDeleted] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [postUnliked, setPostUnliked] = useState(false);
  const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);
  const [isTimelineUpdated, setIsTimelineUpdated] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const updatePhoto = (value) => {
    setIsPhotoUpdated(value);
  };

  const fetchMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const userId = props.user.data ? props.user.data._id : null;
    if (userId) {
      getPostsByUser(userId, page).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          data.length > 0 ? setHasMore(true) : setHasMore(false);
          setPosts([...posts, ...data]);
        }
      });
    }
  }, [props.user.data, postDeleted, postLiked, postUnliked, page]);

  useEffect(() => {
    if (props.user) {
      setPhotoURL(
        `${process.env.REACT_APP_API_URL}/user/photo/${
          props.user.data._id
        }? ${new Date().getTime()}`
      );
      setIsPhotoUpdated(false);
    } else {
      setPhotoURL("");
    }
  }, [props.user, isPhotoUpdated]);

  useEffect(() => {
    if (props.user) {
      setTimelineURL(
        `${process.env.REACT_APP_API_URL}/user/timelinephoto/${
          props.user.data._id
        }? ${new Date().getTime()}`
      );
      setIsTimelineUpdated(false);
    } else {
      setTimelineURL("");
    }
  }, [props.user, isTimelineUpdated]);

  const deletePost = () => {
    setPostDeleted((postDeleted) => !postDeleted);
  };
  const likePost = () => {
    setPostLiked((postLiked) => !postLiked);
  };
  const unlikePost = () => {
    setPostUnliked((postUnliked) => !postUnliked);
  };

  const fallbackImage = (e) => {
    e.target.onerror = null;
    setPhotoURL(
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg"
    );
  };

  const timelineFallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src = "https://wallpapercave.com/wp/wp8814098.jpg";
  };

  const toggleShowEdit = () => {
    setShowInfo(false);
    setShowPosts(false);
    setShowFollowing(false);
    setShowFollower(false);
    setShowEdit(true);
  };
  const toggleShowInfo = () => {
    setShowInfo(true);
    setShowFollowing(false);
    setShowFollower(false);
    setShowEdit(false);
    setShowPosts(false);
  };

  const toggleShowFollowing = () => {
    setShowFollowing(true);
    setShowFollower(false);
    setShowInfo(false);
    setShowEdit(false);
    setShowPosts(false);
  };

  const toggleShowFollower = () => {
    setShowFollower(true);
    setShowFollowing(false);
    setShowInfo(false);
    setShowEdit(false);
    setShowPosts(false);
  };
  const toggleShowPosts = () => {
    setShowPosts(true);
    setShowFollower(false);
    setShowFollowing(false);
    setShowInfo(false);
    setShowEdit(false);
  };

  return (
    <>
      {props.user.data ? (
        <div className="profile-header-container">
          <div className="timeline-photo">
            <img
              className="timeline-image"
              src={timelineURL}
              alt={props.user.data.name}
              onError={timelineFallbackImage}
            />
          </div>
          <div className="profile-photo">
            <img
              className="profile-image"
              src={photoURL}
              alt={props.user.data.name}
              onError={fallbackImage}
            />
            <h2>{props.user.data.name}</h2>
          </div>
          {isAuthenticated() && !isOriginalUser(props.user.data._id) ? (
            <div className="follow-unfollow">
              {!props.following ? (
                <FollowButton
                  followUser={props.followUser}
                  setFollowUser={props.setFollowUser}
                />
              ) : (
                <UnfollowButton
                  followUser={props.followUser}
                  setFollowUser={props.setFollowUser}
                />
              )}
            </div>
          ) : null}

          <div className="navbar">
            <Link className="navbar-item" onClick={toggleShowPosts}>
              Posts
            </Link>
            <Link className="navbar-item" onClick={toggleShowInfo}>
              About {props.user.data.name}
            </Link>
            <Link className="navbar-item" onClick={toggleShowFollowing}>
              Following
            </Link>
            <Link className="navbar-item" onClick={toggleShowFollower}>
              Followers
            </Link>
            {isOriginalUser(props.user.data._id) ? (
              <button className="edit-profile" onClick={toggleShowEdit}>
                Edit Profile
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className="user-interaction">
        {showInfo ? <UserInfo user={props.user} /> : null}
        {isOriginalUser && showEdit ? (
          <EditUser
            user={props.user}
            update={props.update}
            updatePhoto={updatePhoto}
          />
        ) : null}
        {showFollowing ? <Following user={props.user} /> : null}
        {showFollower ? <Followers user={props.user} /> : null}
        {showPosts ? (
          <AllPosts
            posts={posts}
            deletePost={deletePost}
            likePost={likePost}
            unlikePost={unlikePost}
            fetchMore={fetchMore}
            hasMore={hasMore}
          />
        ) : null}
      </div>
    </>
  );
};

export default ProfileHeader;
