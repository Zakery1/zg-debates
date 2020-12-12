import React from "react";

import { Link } from "react-router-dom";

import "./CategoriesBar.scss";

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  //get categories
  const catagories: CategoriesArray = [
    { id: 1, name: "Politics" },
    // { id: 2, name: "Covid" },
    // { id: 3, name: "Sports" },
  ];

  const availableCategories = catagories.map((category: CategoryItem) => {
    return (
      <div key={category.id}>
        {/* <Link to="/category" >{category.name}</Link> */}
        <Link
          className="zg-category"
          to={{
            pathname: "/category",
            state: {
              name: "zak",
            },
          }}
        >
          {category.name}
        </Link>
      </div>
    );
  });

  return (
    <div className="zg-categories-bar">
      <h1 className="zg-categories-bar-header">Current Topics</h1>
      {availableCategories}
    </div>
  );
};

export default CategoriesBar;
