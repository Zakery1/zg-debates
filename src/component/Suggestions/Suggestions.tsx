import React from "react";

import CreateSuggestion from "../CreateSuggestion/CreateSuggestion";

import "./Suggestions.scss";

const Suggestions: React.FC = () => {
  //need new suggestions table
  //retreive existing suggestions
  //need to submit suggestions to new suggestions table
  //only allow admin to delete

  return <div className="zg-suggestions"><CreateSuggestion/></div>;
};

export default Suggestions;
