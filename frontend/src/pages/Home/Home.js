import React, { useEffect, useState } from "react";
import UsersList from "../../components/UsersList";
import { isAuthenticated } from "../../helpers/auth";
import { suggestUsers } from "../../helpers/user";
import AllPosts from "../../postComponents/AllPosts";
import CreatePost from "../../postComponents/CreatePost";
import { getPosts } from "../../postHelpers/post";
import "./styles/home.css";

const Home = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postDeleted, setPostDelted] = useState(false);
  const [postLiked, setPostLiked] = useState(false);
  const [postUnliked, setPostUnliked] = useState(false);

  const [post, setPost] = useState({
    body: "",
    photo: null,
    formdata: new FormData(),
  });
  const { formdata } = post;

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/signin");
    }
  }, [history]);

  const uploadPost = (createPost) => {
    createPost(formdata).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPost({ body: "", formdata: new FormData(), photo: null });
      }
    });
  };

  const deletePost = () => {
    setPostDelted((postDeleted) => !postDeleted);
  };
  const likePost = () => {
    setPostLiked((postLiked) => !postLiked);
  };
  const unlikePost = () => {
    setPostUnliked((postUnliked) => !postUnliked);
  };


  useEffect(() => {
    if (isAuthenticated()) {
      getPosts().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setPosts(data.posts);
        }
      });
    }
  }, [post, postDeleted, postLiked, postUnliked]);

  useEffect(() => {
    if (isAuthenticated()) {
      suggestUsers().then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUsers(data);
        }
      });
    }
  }, [setUsers]);

  return (
    <>
      <div className="home-container">
        <CreatePost post={post} setPost={setPost} uploadPost={uploadPost} />
        <UsersList users={users} />
        <AllPosts
          posts={posts}
          deletePost={deletePost}
          likePost={likePost}
          unlikePost={unlikePost}
        />
      </div>
    </>
  );
};

export default Home;
