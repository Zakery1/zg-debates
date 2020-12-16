import React from "react";

import { Link, useParams } from "react-router-dom";

import "./Category.scss";

interface Category {
  cat: string;
}

//get Categories that match category

const Category: React.FC = () => {
  let { cat }: Category = useParams();
  console.log(cat)

  const categoriesArray = [
    "Trump did a great job with Covid-19",
    "Biden is too moderate",
  ];

  let categories = categoriesArray.map((category, index) => {
    return (
      <Link key={index} className="zg-discussion-link" to="/category/issue">
        {category}
        <br />
      </Link>
    );
  });

  return (
    <div className="zg-category">
      <h2 className="zg-category-header">
        Current discsusions in the category
      </h2>
      {categories}
      <Link className="zg-back-to-topics" to="/">
        Back to Topics
      </Link>
    </div>
  );
};

export default Category;