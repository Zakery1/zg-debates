import React, { useEffect, useState } from "react";

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
  discussion: string;
}

interface DiscussionsArray extends Array<Discussion> {}

const Category: React.FC<CategoryProps> = (props) => {
  const [category, setCategory] = useState<CategoryProps>({
    categoryId: null,
    categoryName: "",
  });

  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, discussion: "" },
  ]);
  const fetchDiscussions = async () => {
    await axios
      .get(`http://localhost:3000/api/getDiscussions/${props.categoryId}`)
      .then((res) => {
        const retrievedDiscussions = res.data;
        setDiscussions(retrievedDiscussions);
      });
  };

  useEffect(() => {

    fetchDiscussions();
    console.log("watch useeffect");
  }, [props.categoryId]);

  let currentDiscussions = discussions.map((discussion, index) => {
    return (
      <div key={index} className="zg-category-link-holder">
        <Link to={`/discussion/${discussion.id}`}>
          {discussion.discussion}
        </Link>
        <br />
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
          <CreateDiscussion categoryId={props.categoryId} fetchDiscussions={fetchDiscussions} />
        </div>

        <br />
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
