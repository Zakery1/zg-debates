import React from "react";


import "./Login.scss";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="zg-login">
      <div className="zg-login-title">New Twitter</div>
      <div className="zg-login-portal">
        Login portal
        <input type="text" placeholder="Email or Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
        <Link to="/login">Forgot PLinkssword?</Link>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
