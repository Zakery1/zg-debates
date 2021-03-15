import React, { useState, useContext, useEffect } from "react";

import { SimpleCtx } from "../context/UserContext";

import axios from "axios";

interface LoginInfo {
  username: string;
  password: string;
}

const useLogin = () => {
  // const baseUrl =
  console.log("login hook")
  //   process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  // const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  // const value = useContext(SimpleCtx);

  // const login = async () => {
  //   await axios
  //     .post(`${baseUrl}/api/users/sessions`, {
  //       loginInfo,
  //     })
  //     .then((res) => {
  //       value?.setUsername(res.data.username);
  //       value?.setId(res.data.userId);
  //       localStorage.setItem("username", res.data.username);
  //       localStorage.setItem("userId", res.data.userId);
  //     })
  //     .catch((error) => {
  //       console.log("Axios error POST on login", error);
  //       alert("invalid username or password");
  //     });
  //   return { loginInfo, setLoginInfo };
  // };
};

export default useLogin;
