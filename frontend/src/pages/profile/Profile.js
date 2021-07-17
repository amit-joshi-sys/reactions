import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader";
import { isAuthenticated } from "../../helpers/auth";
import { getUserDetails, isFollowing } from "../../helpers/user";

const Profile = ({ history }) => {
  const { userId } = useParams();
  const [user, setUser] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [following, setFollowing] = useState(false);

  const update = (value) => {
    setIsUpdated(value);
  };

  useEffect(() => {
    getUserDetails(userId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser({ data });
        let following = isFollowing(data);
        setFollowing(following);
        setIsUpdated(false);
      }
    });
  }, [userId, isUpdated]);

  const setFollowUser = () => {
    setFollowing(!following);
  };

  const followUser = (follow) => {
    const followId = userId;
    follow(followId, isAuthenticated().user._id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser({ data });
      }
    });
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/signin");
    }
  }, [history]);

  return (
    <>
      <ProfileHeader
        update={update}
        setFollowUser={setFollowUser}
        user={user}
        followUser={followUser}
        following={following}
      />
    </>
  );
};

export default Profile;
