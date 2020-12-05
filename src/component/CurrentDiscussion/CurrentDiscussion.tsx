import React from "react";
import { Link } from "react-router-dom";

const CurrentDiscussion: React.FC = () => {
  return (
    <div className="zg-current-discussion">
      <br />
      CurrentDiscussion: <br />
      We will have the discussion on this page 
      <br />
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default CurrentDiscussion;
