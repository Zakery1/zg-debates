import React, {useState} from "react";

import "./CreateSuggestion.scss";

const CreateSuggestion: React.FC = () => {
  const [hidden, setHidden] = useState("zg-hidden");


  //need new suggestions table
  //retreive existing suggestions
  //need to submit suggestions to new suggestions table
  //only allow admin to delete

  return (
    <div className="zg-create-suggestion">
      <div className="zg-prompt-create">
        <button onClick={() => setHidden(" ")}> Create Suggestion</button>
      </div>
      <div className={`zg-suggestion-box ${hidden}`}>
        Suggestion: <input type="text" />
        <br />
        Suggestion author:
        <input type="text" />
        <br />
        <button onClick={() => setHidden("zg-hidden")}>submit suggestion</button>
      </div>
    </div>
  );
};

export default CreateSuggestion;
