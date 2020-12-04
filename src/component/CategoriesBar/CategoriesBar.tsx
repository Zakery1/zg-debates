import React from "react";

import Category from "../Category/Caregory";
import { Link } from "react-router-dom";

interface CategoryItem {
  id: number;
  name: string;
}

interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  //get categories
  const catagories: CategoriesArray = [
    { id: 1, name: "Politics" },
    { id: 2, name: "Covid" },
    { id: 3, name: "Sports" },
  ];

  const availableCategories = catagories.map((category: Category) => {
    return (
      <div key={category.id}>
        <Link to="/category" >{category.name}</Link>
      </div>
    );
  });

  return <div className="zg-categories-bar">{availableCategories}</div>;
};

export default CategoriesBar;
