import React from "react";

import { Link } from 'react-router-dom';


import "./Login.scss";

const Login: React.FC = () => {
  return <div className="zg-login">Login<Link to="/">back</Link></div>;
};

export default Login;
