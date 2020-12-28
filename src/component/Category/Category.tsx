import React, { useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import CreateDiscussion from "../CreateDiscussion/CreateDiscussion";

import Button from "@material-ui/core/Button";

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
        .get(`http://localhost:8080/api/getDiscussions/${categoryId}`)
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
      <div className="zg-category-button-holder">
        <div className="zg-category-action-holder">
          <CreateDiscussion categoryId={categoryId} />
          <Button
            className="zg-back-to-topics"
            type="button"
            onClick={() => history.goBack()}
          >
            Back to Topics
          </Button>
        </div>

        <br />
        <div className="zg-discussion-list">{currentDiscussions}</div>
      </div>
    </div>
  );
};

export default Category;
