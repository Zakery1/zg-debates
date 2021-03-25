import React from "react";

import "./CreateSuggestion.scss";

const CreateSuggestion: React.FC = () => {

  //need new suggestions table
    //retreive existing suggestions
    //need to submit suggestions to new suggestions table
    //only allow admin to delete

  return (
    <div className="zg-create-suggestion">
      <h1>Suggestions</h1>
      Suggestion:
      <input type="text" />
      <br />
      Suggestion author:
      <input type="text" />
      <br/>
      <button>submit suggestion</button>
    </div>
  );
};

export default CreateSuggestion;
