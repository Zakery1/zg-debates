import React, { useEffect, useCallback, useState } from "react";

import axios from "axios";

import "./CurrentSuggestions.scss";

interface SuggestionItem {
  id: number | null;
  suggestion: string;
  suggestionAuthor: string;
  creationDate: string;
}

interface SuggestionsArray extends Array<SuggestionItem> {}

const CurrentSuggestions: React.FC = () => {
  //   const [suggestion, setSuggestion] = useState<SuggestionItem>({
  //     id: null,
  //     suggestion: "string",
  //     suggestionAuthor: "string",
  //     creationDate: "string",
  //   });
  const [suggestions, setSuggestions] = useState<SuggestionsArray>([]);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;
  //need new suggestions table
  //retreive existing suggestions
  //need to submit suggestions to new suggestions table
  //only allow admin to delete

  let fetchSuggestions = useCallback(async () => {
    await axios.get(`${baseUrl}/api/suggestions/`).then((res) => {
      setSuggestions(res.data);
    });
    console.log("suggestions", suggestions);
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const currentSuggestions = suggestions.map((currentSuggestion) => {
    return <div>{currentSuggestion.suggestion}</div>;
  });

  return (
    <div className="zg-current-suggestions">
      <div>
        <h3>Current Suggestions</h3>
      </div>
      {currentSuggestions}
    </div>
  );
};

export default CurrentSuggestions;
