import React, { useState, useEffect } from "react";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import "./CurrentDiscussion.scss";

interface discussionParams {
  id: string;
}

interface ContributionItem {
  id: number | null;
  userId: number | null;
  discussionId: number | null;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number | null;
}

interface ContributionsArray extends Array<ContributionItem> {}

const CurrentDiscussion: React.FC = () => {
  const { id }: discussionParams = useParams();
  let history = useHistory();

  const [contributions, setContributions] = useState<ContributionsArray>([
    {
      id: null,
      userId: null,
      discussionId: null,
      contribution: "string",
      agree: null,
      neutral: null,
      disagree: null,
      points: null,
    },
  ]);

  useEffect(() => {
    const fetchContributions = async () => {
      await axios
        .get(`http://localhost:8080/api/getContributions/${id}`)
        .then((res) => {
          console.log("contributions response", res);
          setContributions(res.data);
        });
    };
    fetchContributions();
    console.log("contributions in usestate", contributions);
  }, [setContributions]);

  return (
    <div className="zg-current-discussion">
      <h3 className="zg-current-discussion-header">
        Discusion title/argument will go here.
      </h3>
      <br />
      <div className="zg-position-container">
        <div className="zg-agree">Agree</div>
        <div className="zg-neutral">Neutral</div>
        <div className="zg-disagree">Disagree</div>
      </div>

      <br />

      <button
        className="zg-back-to-premises"
        type="button"
        onClick={() => history.goBack()}
      >
        Back to Discussions
      </button>
      <br />
    </div>
  );
};

export default CurrentDiscussion;
