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
      });
  }, [props, baseUrl]);

  useEffect(() => {
    fetchDiscussions();
    console.log("watch useeffect");
  }, [fetchDiscussions]);

  let currentDiscussions = discussions.map((discussion, index) => {
    return (
      <div key={index} className="zg-category-link-holder">
        <Link
          className="zg-discussion-link"
          to={`/discussion/${discussion.id}`}
        >
          {discussion.name}
        </Link>
      </div>
    );
  });

  return (
    <div className="zg-category">
      <h3 className="zg-category-header">
        Current {props.categoryName} discussions
      </h3>
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
