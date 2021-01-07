import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";

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

interface DiscussionName {
  discussionName: string;
}

// interface IContributionId {
//   contributionId: number;
// }

interface VotesArray extends Array<IVote> {}

const CurrentDiscussion: React.FC<DiscussionName> = (props) => {
  const { id } = useParams<{ id: string | undefined }>();

  let userId = 1;

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
      points: 0,
    },
  ]);

  const [votes, setVotes] = useState<VotesArray>([{ id: null }]);

  let fetchVotes = useCallback(async () => {
    await axios
      .get(`http://localhost:3000/api/getVotes/${userId}`)
      .then((res) => {
        let contributionIds = res.data.map((contribution: any) => {
          return contribution.contributionId;
        });
        setVotes(contributionIds);
      });
  }, [userId]);

  const userVotes = (contributionId: any) => {
    return votes.includes(contributionId);
  };

  let fetchContributions = useCallback(async () => {
    await axios
      .get(`http://localhost:3000/api/getContributions/${id}`)
      .then((res) => {
        console.log("fetchContributions response", res);
        setContributions(res.data);
      });
  }, [id]);

  useEffect(() => {
    fetchVotes();
    fetchContributions();
  }, [fetchContributions, fetchVotes]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      return (
        <Contribution
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
      <h3 className="zg-current-discussion-header">discussion </h3>
      <div className="zg-discussion-buttons">
        <CreateContribution />
        <br />
        <Button
          className="zg-back-to-premises"
          type="button"
          onClick={() => history.push("/")}
        >
          Discussions
        </Button>
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
