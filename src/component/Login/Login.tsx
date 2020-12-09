import React from "react";

import "./Login.scss";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="zg-login">
      <div className="zg-login-title">
        <h1>New Twitter</h1>
      </div>
      <div className="zg-login-portal">
        <input className="zg-login-username" type="text" placeholder="Email or Username" />
        <input className="zg-login-password" type="password" placeholder="Password" />
        <button className="zg-login-button">Log In</button>
        <Link to="/login">Forgot Password?</Link>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
