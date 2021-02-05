import React, { useState } from "react";

import axios from "axios";

import Register from "../Register/Register";

import "./Login.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async () => {
    await axios
      .post("https://zg-debates.netlify.app/api/loginUser", {username: username, password: password})
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log("Axios error POST on login", error);
        alert("invalid username of password");
      });
  };

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
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          autoComplete="currentPassword"
          className="zg-login-password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => login()}
          type="button"
          className="zg-login-button"
        >
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
