import React from "react";
import { Link } from "react-router-dom";

const CurrentDiscussion: React.FC = () => {
  return (
    <div className="zg-current-discussion">
      CurrentDiscussion <br />
      <Link to="/">Back home</Link>
    </div>
  );
};

export default CurrentDiscussion;
