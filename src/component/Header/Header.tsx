import React from "react";
import { Link } from 'react-router-dom';

import "./Header.scss";

const Header: React.FC = () => {
  return <div className="zg-header">Header<Link to="/login">login</Link></div>;
};

export default Header;
