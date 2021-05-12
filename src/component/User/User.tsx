import React, { useContext } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import "./User.scss";

const User: React.FC = () => {
  const value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const logout = async () => {
    await axios.post(`${baseUrl}/api/users/logout`).then((response) => {
      value?.setUsername(null);
      value?.setId(null);
      localStorage.clear();
    });
  };

  return (
    <div>
      User
      <div>
        <Link className="zg-logout" to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default User;
