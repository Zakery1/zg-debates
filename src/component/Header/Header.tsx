import React from "react";
import { Link } from "react-router-dom";

import User from '../User/User';

import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="zg-header">
      <Link className="zg-header-home" to="/">New Twitter</Link>
      <User/>
      <Link className="zg-header-login" to="/login">Log In</Link>
    </div>
  );
};

export default Header;
