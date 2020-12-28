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
      await axios.get(`http://localhost:8080/api/getCategories`).then((res) => {
        const retrievedCategories = res.data;
        setCategories(retrievedCategories);
      });
    };
    fetchCategories();
  }, []);

  const availableCategories = categories.map((category, index) => {
    return (
      <div className="zg-category-link-holder" key={index}>
        <Link
          className="zg-category"
          to={{
            pathname: `/${category.id}`,
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
      <div className="zg-category-container">
        {categories && availableCategories}
      </div>
    </div>
  );
};

export default CategoriesBar;
