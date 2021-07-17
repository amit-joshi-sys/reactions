import { isAuthenticated } from "../helpers/auth";

export const createPost = (post) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/post/new/${isAuthenticated().user._id}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
      body: post,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPosts = (page) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPostsByUser = (userId, page) => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/posts/by/${userId}/?page=${page}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${isAuthenticated().token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const likePost = (postId) => {
  const userId = isAuthenticated().user._id;
  return fetch(`${process.env.REACT_APP_API_URL}/post/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ postId, userId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unlikePost = (postId) => {
  const userId = isAuthenticated().user._id;
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlikes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ postId, userId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const postDetails = (postId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createComment = (postId, comment) => {
  const userId = isAuthenticated().user._id;
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ postId, userId, comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const uncomment = (postId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ postId, comment }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
