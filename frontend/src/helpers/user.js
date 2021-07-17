import { isAuthenticated } from "./auth";

export const getUserDetails = (userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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

export const isOriginalUser = (_id) => {
  if (!_id) {
    return false;
  }
  if (isAuthenticated().user._id !== _id) {
    return false;
  } else {
    return true;
  }
};

export const getAllUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`, {
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

export const suggestUsers = () => {
  return fetch(
    `${process.env.REACT_APP_API_URL}/user/findpeople/${
      isAuthenticated().user._id
    }`,
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

export const deleteUser = (userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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

export const updateUser = (user, userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isFollowing = (user) => {
  const match = user.followers.find((follower) => {
    return follower._id === isAuthenticated().user._id;
  });
  return match;
};

export const follow = (followId, userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const unfollow = (unfollowId, userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const searchUser = (name) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/search/${name}`, {
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
