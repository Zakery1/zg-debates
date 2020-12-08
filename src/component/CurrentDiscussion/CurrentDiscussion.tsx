import React from "react";
import { Link } from "react-router-dom";

import "./CurrentDiscussion.scss";

const CurrentDiscussion: React.FC = () => {
  return (
    <div className="zg-current-discussion">
      <br />
      <br />

      <h3>Discusion title/argument will go here.</h3>
      <br />
      <div className="zg-position-container">
        <div className="zg-agree">Agree</div>
        <div className="zg-neutral">Neutral</div>
        <div className="zg-disagree">Disagree</div>
      </div>

      <br />

      <Link to="/category">Back to Premises</Link>
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentDiscussion;
