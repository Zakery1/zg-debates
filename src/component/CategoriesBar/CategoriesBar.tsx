import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import "./CategoriesBar.scss";

// interface CategoryItem {
//   id: number;
//   name: string;
// }

// interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get(`https://fathomless-reaches-38159.herokuapp.com/api/getCategories`)
        .then((res) => {
          const user = res.data;
          setCategories(user);
        });
    }
    fetchUser();
    console.log("categories", categories)
  }, [categories]);

  const availableCategories = categories.map((category) => {
    return (
      <div key={category}>
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
          {category}
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
