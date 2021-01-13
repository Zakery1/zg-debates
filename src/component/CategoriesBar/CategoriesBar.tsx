import React, { useState, useEffect } from "react";

import axios from "axios";

import "./CategoriesBar.scss";

import Category from "../Category/Category";

interface CategoryItem {
  id: number | null;
  categoryName: string;
}

interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryItem>({
    id: null,
    categoryName: "",
  });
  const [categories, setCategories] = useState<CategoriesArray>([
    { id: null, categoryName: "" },
  ]);


  const selectCategory = (id: number | null, name: string) => {
    setShowCategory(true);
    setCategory({ id: id, categoryName: name });
    return;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await axios.get(`https://zg-debates.netlify.app/api/getCategories`).then((res) => {
        const retrievedCategories = res.data;
        setCategories(retrievedCategories);
      });
    };
    fetchCategories();
  });

  const availableCategories = categories.map((category, index) => {
    return (
      <div className="zg-category-link-holder" key={index}>
        <button
          onClick={() => selectCategory(category.id, category.categoryName)}
          className="zg-single-category"
        >
          {category.categoryName}
        </button>
      </div>
    );
  });

  return (
    <div className="zg-categories-bar-holder">
      <div className="zg-categories-bar">
        <span className="zg-categories-bar-header">Current Topics</span>
        {categories.length ? (
          <div className="zg-category-container">{availableCategories}</div>
        ) : (
          ""
        )}
      </div>
      {showCategory ? (
        <Category
          // hideCategory={hideCategory}
          categoryId={category.id}
          categoryName={category.categoryName}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CategoriesBar;
