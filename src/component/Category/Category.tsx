import React, { useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import CreateDiscussion from "../CreateDiscussion/CreateDiscussion";

import axios from "axios";

import "./Category.scss";

interface categoryParams {
  categoryId: string;
}

interface Discussion {
  id: number | null;
  discussion: string;
}

interface DiscussionsArray extends Array<Discussion> {}

const Category: React.FC = () => {
  let { categoryId }: categoryParams = useParams();
  let history = useHistory();

  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, discussion: "" },
  ]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      await axios
        .get(
          // `https://fathomless-reaches-38159.herokuapp.com/api/getDiscussions/${categoryId}`
          `http://localhost:8080/api/getDiscussions/${categoryId}`
        )
        .then((res) => {
          const retrievedDiscussions = res.data;
          setDiscussions(retrievedDiscussions);
        });
    };
    fetchDiscussions();
  }, [categoryId]);

  let currentDiscussions = discussions.map((discussion) => {
    return (
      <Link
        key={discussion.id}
        className="zg-discussion-link"
        to={{
          pathname: `/discussion/${discussion.id}`,
        }}
      >
        {discussion.discussion}
        <br />
      </Link>
    );
  });

  return (
    <div className="zg-category">
      <h2 className="zg-category-header">Current {categoryId} discussions</h2>
      {currentDiscussions}
      <CreateDiscussion categoryId={categoryId}/>
      <button
        className="zg-back-to-topics"
        type="button"
        onClick={() => history.goBack()}
      >
        Back to Topics
      </button>
    </div>
  );
};

export default Category;
