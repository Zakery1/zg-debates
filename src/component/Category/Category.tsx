import React from "react";

import { Link } from "react-router-dom";

// interface Category {
//   id: number;
//   name: string;
// }



//get Categories that match category

const Category: React.FC = () => {
  return (
    <div className="App">
      Category Component
      <br />
      <Link to="/category/issue">Orange Man Bad</Link>
      <br />
      {/* <Link to={{pathname: issue}}>Another premise</Link> */}
      <Link to="/category/issue">Orange Man Good</Link>
      <br/>
      <Link to="/">Home</Link>
      <br />
      <br />
    </div>
  );
};

export default Category;
