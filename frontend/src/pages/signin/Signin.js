import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authenticate, signIn } from "../../helpers/auth";
import "./styles/signin.css";
import Loader from "../../components/Loader";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const signInHandler = (event) => {
    event.preventDefault();
    const user = { password, email };
    signIn(user)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
          setEmail("");
          setPassword("");
        } else {
          authenticate(data, () => {
            setRedirect(true);
          });
          setTimeout(() => {
            history.push("/");
          }, 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const disabledUntil = password === "" || email === "";
  return (
    <>
      <div className="signin-container">
        <div className="signin-content">
          <h3>Welcome To Reactions!!</h3>
          <form className="signin-form">
            {error ? <h4 className="error">{error}</h4> : null}
            {redirect ? <Loader /> : null}
            <div className="signin-form-container">
              <label className="signin-input-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signin-form-container">
              <label className="signin-input-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="signin-btn"
              onClick={signInHandler}
              disabled={disabledUntil}
            >
              Sign In
            </button>
            <Link to="/forgot-password" className="signin-link">
              Forgot Password ?
            </Link>

            <Link className="signin-link" to="/signup">
              New Here? Sign Up Here!
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
