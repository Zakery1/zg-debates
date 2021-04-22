import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "./CategoriesBar.scss";

import Category from "../Category/Category";
import Welcome from "../Welcome/Welcome";

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
  const [categories, setCategories] = useState<CategoriesArray>([]);

  const selectCategory = (id: number | null, name: string) => {
    setShowCategory(true);
    setCategory({ id: id, categoryName: name });
    return;
  };

  const exitCategory = () => {
    setShowCategory(false);
    setCategory({ id: null, categoryName: "" });
  }

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const fetchCategories = useCallback(async () => {
    await axios.get(`${baseUrl}/api/categories`).then((res) => {
      setCategories([...res.data]);
    });
  }, [baseUrl]);

  useEffect(() => {
    console.log("watch use effect");
    fetchCategories();
  }, [fetchCategories]);

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
          <div>
            <div className="zg-category-container">{availableCategories}</div>
            <div className="zg-category-container">
            <div className="zg-category-link-holder">
              <button onClick={() => exitCategory()} className="zg-single-category">
                <ArrowBackIcon />
              </button>
              </div>
            </div>
          </div>
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
        <Welcome />
      )}
    </div>
  );
};

export default CategoriesBar;
