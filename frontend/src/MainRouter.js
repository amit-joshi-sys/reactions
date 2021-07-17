import React from "react";
import { Route, Switch } from "react-router-dom";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Menu from "./pages/menu/Menu";
import PostDetails from "./pages/postDetails/PostDetails";
import Profile from "./pages/profile/Profile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

const MainRouter = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordLink"
          component={ResetPassword}
        />
        <Route exact path="/user/:userId" component={Profile} />
        <Route exact path="/post/:postId" component={PostDetails} />
      </Switch>
    </>
  );
};

export default MainRouter;
