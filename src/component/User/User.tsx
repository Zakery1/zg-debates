import React, { useContext } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import "./User.scss";

const User: React.FC = () => {
  const value = useContext(SimpleCtx);

  const logout = async () => {
    await axios.post("https://fathomless-reaches-38159.herokuapp.com/api/logout").then((response) => {
      value?.setUsername(null);
      value?.setId(null);
      localStorage.clear();
    });
  };

  return (
    <div>
      User
      <div>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default User;
