import React from "react";

//components
import CatagoriesBar from "../CategoriesBar/CategoriesBar";
// import CurrentDiscussion from "../CurrentDiscussion/CurrentDiscussion";

import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div>
      <CatagoriesBar />
    </div>
  );
};

export default Dashboard;
