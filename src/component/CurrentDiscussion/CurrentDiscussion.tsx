import React from "react";

import { useHistory } from 'react-router-dom';

import "./CurrentDiscussion.scss";

const CurrentDiscussion: React.FC = () => {
  let history = useHistory();
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

      <button className="zg-back-to-premises" type="button" onClick={() => history.goBack()}>Back to Discussions</button>
      <br />
    </div>
  );
};

export default CurrentDiscussion;
