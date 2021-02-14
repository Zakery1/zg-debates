import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import CreateContribution from "../CreateContribution/CreateContribution";
import Contribution from "../Contribution/Contribution";

import "./CurrentDiscussion.scss";

interface ContributionItem {
  id: number | null;
  userId: number | null;
  discussionId: number | null;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number;
}

interface ContributionsArray extends Array<ContributionItem> {}

interface IVote {
  id: number | null;
}

interface VotesArray extends Array<IVote> {}

const CurrentDiscussion: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  console.log("first cat id", id);

  let userId = 1;

  const [discussionName, setDiscussionName] = useState("");

  const [contributions, setContributions] = useState<ContributionsArray>([
    {
      id: null,
      userId: null,
      discussionId: null,
      contribution: "",
      agree: null,
      neutral: null,
      disagree: null,
      points: 0,
    },
  ]);

  const [votes, setVotes] = useState<VotesArray>([]);

  let fetchDiscussion = useCallback(async () => {
    console.log("categoryid", id);
    await axios
      .get(`http://localhost:3000/api/discussions/${id}`)
      .then((res) => {
        console.log("fetchDiscussion response", res);
        setDiscussionName(res.data);
      });
  }, [id]);

  let fetchVotes = useCallback(async () => {
    await axios
      .get(`http://localhost:3000/api/contributions/${userId}`)
      .then((res) => {
        let contributionIds = res.data.map((contribution: any) => {
          return contribution.contributionId;
        });
        setVotes((prevVotes) => [...prevVotes, ...contributionIds]);
      });
  }, [userId]);

  const userVotes = (contributionId: any) => {
    return votes.includes(contributionId);
  };

  let fetchContributions = useCallback(async () => {
    console.log("categoryid", id);

    await axios
      .get(`http://localhost:3000/api/contributions/${id}`)
      .then((res) => {
        console.log("fetchContributions response", res);
        setContributions(res.data);
      });
  }, [id]);

  useEffect(() => {
    fetchDiscussion();
    fetchVotes();
    fetchContributions();
  }, [fetchContributions, fetchVotes, fetchDiscussion]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          key={agreeItem.id}
          contributionId={agreeItem.id}
          points={agreeItem.points}
          initialVote={userVotes(agreeItem.id)}
          contribution={agreeItem.contribution}
        />
      );
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          key={neutralItem.id}
          contributionId={neutralItem.id}
          points={neutralItem.points}
          initialVote={userVotes(neutralItem.id)}
          contribution={neutralItem.contribution}
        />
      );
    });

  let disagreeList = contributions
    .filter((contribution) => contribution.disagree === true)
    .map((disagreeItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          key={disagreeItem.id}
          contributionId={disagreeItem.id}
          points={disagreeItem.points}
          initialVote={userVotes(disagreeItem.id)}
          contribution={disagreeItem.contribution}
        />
      );
    });

  return (
    <div className="zg-current-discussion">
      <h2 className="zg-current-discussion-header">{discussionName} </h2>
      <div className="zg-discussion-buttons">
        <CreateContribution
          discussionName={discussionName}
          fetchContributions={fetchContributions}
        />
        <br />
      </div>

      <div className="zg-position-container">
        <div className="zg-list zg-list-agree">
          <h3>Agree</h3>
          {agreeList}
        </div>
        <div className="zg-list zg-list-neutral">
          <h3>Neutral</h3>
          {neutralList}
        </div>
        <div className="zg-list zg-list-disagree">
          <h3>Disagree</h3>
          {disagreeList}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CurrentDiscussion;
