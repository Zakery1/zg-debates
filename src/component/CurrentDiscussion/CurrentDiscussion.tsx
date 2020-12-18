import React from "react";

import "./CurrentDiscussion.scss";

const CurrentDiscussion: React.FC = () => {
  return (
    <div className="zg-current-discussion">
      <h3 className="zg-current-discussion-header">
        Discusion title/argument will go here.
      </h3>
      <br />
      <div className="zg-position-container">
        <div className="zg-agree">Agree</div>
        <div className="zg-neutral">Neutral</div>
        <div className="zg-disagree">Disagree</div>
      </div>

      <br />

      <button className="zg-back-to-premises">
        Back to Discussions
      </button>
      <br />
    </div>
  );
};

export default CurrentDiscussion;
