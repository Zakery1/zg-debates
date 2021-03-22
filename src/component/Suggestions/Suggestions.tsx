import React from "react";

import "./Suggestions.scss";

const Suggestions: React.FC = () => {

    //need to submit suggestions to new suggestions table
    //retreive existing suggestions
    //only allow admin to delete



  return (
    <div className="zg-suggestions">
      <h1>Suggestions</h1>
      Suggestion:
      <input type="text" />
      <br />
      Suggestion author:
      <input type="text" />
      <br/>
      <button>submit suggestion</button>
      <div>
          <h3>Existing Suggestions</h3>
      </div>
    </div>
  );
};

export default Suggestions;
