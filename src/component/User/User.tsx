import React, { useContext } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import "./User.scss";

const User: React.FC = () => {
  const value = useContext(SimpleCtx);

  const logout = async () => {
    await axios.post("http://localhost:3000/api/logout").then((response) => {
      value?.setUsername(null);
      value?.setId(null);
    });
  };

  return (
    <div>
      User
      <div>
        <Link to="/" onClick={logout}>Logout</Link>
      </div>
    </div>
  );
};

export default User;
