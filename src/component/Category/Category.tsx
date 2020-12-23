import React, { useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import CreateDiscussion from "../CreateDiscussion/CreateDiscussion";

import axios from "axios";

import "./Category.scss";

interface categoryParams {
  cat: string;
}

interface Discussion {
  id: number | null;
  discussion: string;
}

interface DiscussionsArray extends Array<Discussion> {}

const Category: React.FC = () => {
  let { cat }: categoryParams = useParams();
  let history = useHistory();

  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, discussion: "" },
  ]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      await axios
        .get(
          // `https://fathomless-reaches-38159.herokuapp.com/api/getDiscussions/${cat}`
          `http://localhost:8080/api/getDiscussions/${cat}`
        )
        .then((res) => {
          const retrievedDiscussions = res.data;
          setDiscussions(retrievedDiscussions);
        });
    };
    fetchDiscussions();
  }, [cat]);

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
      <h2 className="zg-category-header">Current {cat} discussions</h2>
      {currentDiscussions}
      <CreateDiscussion/>
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
