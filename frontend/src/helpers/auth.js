export const signUp = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const signIn = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const authenticate = (jwt, callbackFuntion) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    callbackFuntion();
  }
};

export const signOut = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const updateUserInLocalStorage = (user) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let updatedInfo = JSON.parse(localStorage.getItem("jwt"));
      updatedInfo.user = user;
      localStorage.setItem("jwt", JSON.stringify(updatedInfo));
    }
  }
};

export const forgotPassword = (email) => {
  return fetch(`${process.env.REACT_APP_API_URL}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const resetPassword = (password, resetPasswordLink) => {
  return fetch(`${process.env.REACT_APP_API_URL}/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, resetPasswordLink }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
