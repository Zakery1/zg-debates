import React from "react";

import { Link } from 'react-router-dom';


interface Category {
  id: number;
  name: string;
}

//get Categories that match category 

const Category: React.FC<Category> = (props: Category) => {
  return (
    <div className="App">
      Category Component
      <Link to="/">back</Link>
      <br />
      <br />
    </div>
  );
};

export default Category;
