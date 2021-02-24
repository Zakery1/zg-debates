import React from "react";

import axios from "axios";

import "./User.scss";

const User: React.FC = () => {
  const logout = async () => {
    await axios
      .post("http://localhost:3000/api/logout")
      .then((response) => {
        console.log("user logged out");
      });
  };

  return (
    <div>
      User
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default User;
