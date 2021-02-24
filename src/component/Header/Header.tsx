import React, { useContext } from "react";

import { Link } from "react-router-dom";

import User from "../User/User";

import { SimpleCtx } from "../../context/UserContext";

import "./Header.scss";

const Header: React.FC = () => {
  const value = useContext(SimpleCtx);
  return (
    <div className="zg-header">
      <Link className="zg-header-home" to="/">
        New Twitter
      </Link>
      <User />
      {value ? (
        <span className="zg-header-login">{value.username}</span>
        
      ) : (
        <Link className="zg-header-login" to="/login">
          Log In
        </Link>
      )}
    </div>
  );
};

export default Header;
