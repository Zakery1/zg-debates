import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import "./CategoriesBar.scss";

interface CategoryItem {
  id: number | null;
  category: string;
}

interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  const [categories, setCategories] = useState<CategoriesArray>([
    { id: null, category: "" },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get(`https://fathomless-reaches-38159.herokuapp.com/api/getCategories`)
        .then((res) => {
          const retrievedCategories = res.data;
          setCategories(retrievedCategories);
        });
    };
    fetchCategories();
  }, []);

  const availableCategories = categories.map((category) => {
    return (
      <div key={category.id}>
        <Link
          className="zg-category"
          to={{
            pathname: "/category",
            state: {
              name: "zak",
            },
          }}
        >
          {category.category}
        </Link>
      </div>
    );
  });

  return (
    <div className="zg-categories-bar">
      <h1 className="zg-categories-bar-header">Current Topics</h1>
      {/* <button onClick={() => fetchUser()}>Get cats</button> */}
      {categories && availableCategories}
    </div>
  );
};

export default CategoriesBar;
