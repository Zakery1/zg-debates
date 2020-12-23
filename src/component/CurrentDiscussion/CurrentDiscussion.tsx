import React, { useState, useEffect } from "react";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import Contribution from "../Contribution/Contribution";

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
      contribution: "",
      agree: null,
      neutral: null,
      disagree: null,
      points: null,
    },
  ]);

  // let fetchData = React.useCallback(async () => {
  //   const result = await fetch(`api/crm/get`);
  //   const body = await result.json();
  //   setTableData(body);
  // },[])

  let fetchContributions = React.useCallback(async () => {
    await axios
      .get(`http://localhost:8080/api/getContributions/${id}`)
      .then((res) => {
        console.log("contributions response", res);
        setContributions(res.data);
      });
  }, [id]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      return <div key={agreeItem.id}>{agreeItem.contribution}</div>;
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      return <div key={neutralItem.id}>{neutralItem.contribution}</div>;
    });

  let disagreeList = contributions
    .filter((contribution) => contribution.disagree === true)
    .map((disagreeItem) => {
      return <div key={disagreeItem.id}>{disagreeItem.contribution}</div>;
    });

  return (
    <div className="zg-current-discussion">
      <h3 className="zg-current-discussion-header">
        Discusion title/argument will go here.
      </h3>
      <div className="zg-position-container">
        <div className="zg-agree">
          <h3>Agree</h3>
          {agreeList}
        </div>
        <div className="zg-neutral">
          <h3>Neutral</h3>
          {neutralList}
        </div>
        <div className="zg-disagree">
          <h3>Disagree</h3>
          {disagreeList}
        </div>
      </div>
      <br />

      <Contribution />
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
