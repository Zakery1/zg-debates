import React from "react";

import "./Welcome.scss";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  return (
    <div className="zg-welcome">
      <h1 className="zg-welcome-header">Welcome</h1>
      <p>Welcome to ZG-Debates.  Our goal is to create better quality<br/> discourse surrounding important and challenging topics. </p>
      <p>If you feel compelled, feel free to give suggestions on how we can improve <Link to="./suggestions">here</Link>.</p>

    </div>
  );
};

export default Welcome;
