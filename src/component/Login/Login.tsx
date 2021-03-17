import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";

import axios from "axios";

import Register from "../Register/Register";

import { SimpleCtx } from "../../context/UserContext";

import "./Login.scss";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  let history = useHistory();

  const value = useContext(SimpleCtx);

  const baseUrl =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const login = async () => {
    if(username.length < 1) {
      return alert("Enter login information to login.")
    }
    await axios
      .post(`${baseUrl}/api/users/sessions`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setUsername("");
        setPassword("");
        value?.setUsername(res.data.username);
        value?.setId(res.data.userId);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("userId", res.data.userId);
        history.push("/");
      })
      .catch((error) => {
        console.log("Axios error POST on login", error);
        alert("invalid username of password");
      });
  };

  return (
    <div className="zg-login">
      <div className="zg-login-title">
        <h1>ZG-Debates</h1>
      </div>
      <form className="zg-login-portal">
        <input
          value={username}
          autoComplete="email"
          className="zg-login-username"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          value={password}
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
