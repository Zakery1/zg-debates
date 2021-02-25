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
  const fetchDiscussions = useCallback(async () => {
    console.log("props", props);
    await axios
      .get(
        `https://fathomless-reaches-38159.herokuapp.com/api/discussions/?categoryId=${props.categoryId}`
      )
      .then((res) => {
        // console.log("res for a discussion", res.data);
        const retrievedDiscussions = res.data;
        setDiscussions(retrievedDiscussions);
      });
    console.log("is this running in category component");
  }, [props]);

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
      <h2 className="zg-category-header">
        Current {props.categoryName} discussions
      </h2>
      <div className="zg-category-button-holder">
        <div className="zg-category-action-holder">
          <CreateDiscussion
            categoryId={props.categoryId}
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
