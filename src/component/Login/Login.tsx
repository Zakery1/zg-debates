import React from "react";

import { Link } from "react-router-dom";

import Register from "../Register/Register";

import "./Login.scss";

const Login: React.FC = () => {
  return (
    <div className="zg-login">
      <div className="zg-login-title">
        <h1>New Twitter</h1>
      </div>
      <form className="zg-login-portal">
        <input
          autoComplete="email"
          className="zg-login-username"
          type="text"
          placeholder="Email or Username"
        />
        <input
          autoComplete="currentPassword"
          className="zg-login-password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" className="zg-login-button">
          Log In
        </button>
        {/* <Link className="zg-forgot-password" to="/login">
          Forgot Password?
        </Link> */}
        {/* <button className="zg-sign-up-button"> */}
          <Register />
        {/* </button>/ */}
      </form>
    </div>
  );
};

export default Login;
