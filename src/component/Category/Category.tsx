import React from "react";

import { Link } from "react-router-dom";

import "./Category.scss";

// interface Category {
//   id: number;
//   name: string;
// }

//get Categories that match category

const Category: React.FC = () => {
  return (
    <div className="zg-category">
      <br />
      <Link to="/category/issue">Orange Man Bad</Link>
      <br />
      {/* <Link to={{pathname: issue}}>Another premise</Link> */}
      <Link to="/category/issue">Orange Man Good</Link>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Category;
