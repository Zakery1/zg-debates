import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

import CreateDiscussion from "../CreateDiscussion/CreateDiscussion";

import axios from "axios";

import "./Category.scss";

interface CategoryProps {
  categoryId: number | null;
  categoryName: string;
}

interface Discussion {
  id: number | null;
  name: string;
}

interface DiscussionsArray extends Array<Discussion> {}

const Category: React.FC<CategoryProps> = (props) => {
  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, name: "" },
  ]);

  const baseUrl =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const fetchDiscussions = useCallback(async () => {
    await axios
      .get(
        `${baseUrl}/api/discussions/?categoryId=${props.categoryId}`
      )
      .then((res) => {
        const retrievedDiscussions = res.data;
        setDiscussions(retrievedDiscussions);
        scrollToCategoriesMobile();

      });
  }, [props, baseUrl]);

  const scrollToCategoriesMobile = () => {
    if(window.innerWidth < 501)
    document.getElementById('zg-back')?.scrollIntoView({behavior: "smooth"});
  }

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  let currentDiscussions = discussions.map((discussion, index) => {
    return (
      <Link key={index} to={`/discussion/${discussion.id}`} className="zg-category-link-holder">
        <div
          className="zg-discussion-link"
          
        >
          {discussion.name}
        </div>
      </Link>
    );
  });

  return (
    <div className="zg-category">
      <div className="zg-category-header">
      <div id="zg-back" className="zg-category-header-text">
         {props.categoryName} 
      </div>
      </div>

      <div className="zg-category-button-holder">
        <div className="zg-category-action-holder">
          <CreateDiscussion
            categoryId={props.categoryId}
            categoryName={props.categoryName}
            fetchDiscussions={fetchDiscussions}
          />
        </div>
        {discussions.length ? (
          <div className="zg-discussion-list">{currentDiscussions}</div>
        ) : (
          "we need discussions"
        )}
      </div>
    </div>
  );
};

export default Category;
