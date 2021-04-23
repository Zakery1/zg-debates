import React from "react";

import "./Welcome.scss";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  return (
    <div className="zg-welcome">
      <div className="zg-welcome-header">
        <h1 className="zg-welcome-header-text">Welcome</h1>
      </div>

      <p className="zg-welcome-text">
        Welcome to ZG-Debates. Our goal is to create better quality
        <br /> discourse surrounding important and challenging topics.
      </p>
      <p className="zg-welcome-text">
        If you feel compelled, feel free to give suggestions on how we can
        improve <Link to="/suggestions">here</Link>.
      </p>
    </div>
  );
};

export default Welcome;
