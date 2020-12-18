import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

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

  const [discussions, setDiscussions] = useState<DiscussionsArray>([
    { id: null, discussion: "" },
  ]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      await axios
        .get(
          `https://fathomless-reaches-38159.herokuapp.com/api/getDiscussions/${cat}`
        )
        .then((res) => {
          const retrievedDiscussions = res.data;
          setDiscussions(retrievedDiscussions);
        });
    };
    fetchDiscussions();
  }, [cat]);

  let currentDiscussions = discussions.map((discussion, index) => {
    return (
      <Link key={index} className="zg-discussion-link" to="/category/issue">
        {discussion.discussion}
        <br />
      </Link>
    );
  });

  // console.log("discussions", discussions)

  return (
    <div className="zg-category">
      <h2 className="zg-category-header">Current {cat} discsusions</h2>
      {currentDiscussions}
      <button className="zg-back-to-topics">Back to Topics</button>
    </div>
  );
};

export default Category;
