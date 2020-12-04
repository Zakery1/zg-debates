import React from "react";

import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

//get Categories that match category

const Category: React.FC<Category> = (props: Category) => {
  let issue: string = "issie";
  return (
    <div className="App">
      Category Component
      <br />
      <Link to="/category/issue">One premise</Link>
      <br />
      {/* <Link to={{pathname: issue}}>Another premise</Link> */}
      <Link to="/category/issue">Another premise</Link>
      <br/>
      <Link to="/">back</Link>
      <br />
      <br />
    </div>
  );
};

export default Category;
