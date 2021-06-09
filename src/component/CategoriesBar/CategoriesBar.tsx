import React, { useState, useEffect } from "react";

import axios from "axios";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "./CategoriesBar.scss";

import Category from "../Category/Category";
import Welcome from "../Welcome/Welcome";
import { Button } from "@material-ui/core";

interface CategoryItem {
  id: number | null;
  categoryName: string;
}

interface CategoriesArray extends Array<CategoryItem> {}

const CategoriesBar: React.FC = () => {
  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

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
  };

  useEffect(() => {
    console.log("watch use effect");

  const fetchCategories = async () => {
    await axios.get(`${baseUrl}/api/categories`).then((res) => {
      setCategories([...res.data]);
    });
  };
    fetchCategories();
  }, [baseUrl]);

  const availableCategories = categories.map((category, index) => {
    return (
      <div className="zg-category-link-holder" key={index}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => selectCategory(category.id, category.categoryName)}
          className="zg-single-category"
        >
          <span
            style={{ fontFamily: "Montserrat" }}
            className="zg-category-text"
          >
            {category.categoryName}
          </span>
        </Button>
      </div>
    );
  });

  return (
    <div className="zg-categories-bar-holder">
      <div className="zg-categories-bar">
        <div className="zg-categories-bar-header">Go to  Topic</div>
        {categories.length ? (
          <div>
            <div className="zg-category-container">{availableCategories}</div>
            <div className="zg-category-container">
              <div className="zg-category-link-holder">
                <button
                  onClick={() => exitCategory()}
                  className="zg-single-category"
                >
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
