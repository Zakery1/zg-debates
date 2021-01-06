import React, { useEffect, useState } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import CreateDiscussion from "../CreateDiscussion/CreateDiscussion";

import Button from "@material-ui/core/Button";

import axios from "axios";

import "./Category.scss";

interface categoryParams {
  categoryId: string;
}

interface CategoryProps {
  categoryId: number | null;
  categoryName: string;
}

interface HideCategory {
  hideCategory: (event: React.MouseEvent<HTMLButtonElement>) => void
}


interface Discussion {
  id: number | null;
  discussion: string;
}


interface DiscussionsArray extends Array<Discussion> {}

const Category: React.FC<CategoryProps & HideCategory> = (props) => {
  // let { categoryId }: categoryParams = useParams();
  const [category, setCategory] = useState<CategoryProps>(
    {categoryId: null, categoryName: ""}
  );

  // let history = useHistory();

  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, discussion: "" },
  ]);

  console.log("props", props)

  useEffect(() => {
    const fetchDiscussions = async () => {
      await axios
        .get(`http://localhost:3000/api/getDiscussions/${props.categoryId}`)
        .then((res) => {
          const retrievedDiscussions = res.data;
          setDiscussions(retrievedDiscussions);
        });
    };
    fetchDiscussions();
    console.log("watch useeffect")
  }, [props.categoryId]);

  let currentDiscussions = discussions.map((discussion, index) => {
    return (
      <div key={index} className="zg-category-link-holder">
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
      </div>
    );
  });

  return (
    <div className="zg-category">
      <h2 className="zg-category-header">Current {props.categoryName} discussions</h2>
      <div className="zg-category-button-holder">
        <div className="zg-category-action-holder">
          <CreateDiscussion categoryId={props.categoryId} />
          {/* <Button
            className="zg-back-to-topics"
            type="button"
            onClick={() => history.goBack()}
          >
            Back to Topics
          </Button> */}
        </div>

        <br />
        {discussions.length ? (
          <div className="zg-discussion-list">{currentDiscussions}</div>
        ) : (
          "we need discussions"
        )}
                <button onClick={props.hideCategory}>Hide</button>
      </div>
    </div>
  );
};

export default Category;
