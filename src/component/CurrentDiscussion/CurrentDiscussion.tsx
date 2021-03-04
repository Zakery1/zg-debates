import React, { useState, useEffect, useCallback, useContext } from "react";

import { SimpleCtx } from "../../context/UserContext";

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
  const [discussionName, setDiscussionName] = useState("");

  const [votes, setVotes] = useState<VotesArray>([]);

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

  const { discussionId } = useParams<{ discussionId: string | undefined }>();
  // debugger;

  let value = useContext(SimpleCtx);

  useEffect(() => {
    if (value?.id) {
      fetchVotes(value?.id);
    }
  }, [value?.id]);

  let fetchVotes = useCallback(
    async (userId) => {
      console.log("fetch votes firing off --- userId", userId);
      await axios
        .get(`http://localhost:3000/api/votes/?userId=${userId}`)
        .then((res) => {
          let contributionIds = res.data.map((contribution: any) => {
            return contribution.contributionId;
          });
          setVotes((prevVotes) => [...prevVotes, ...contributionIds]);
        })
        .catch((error) => {
          console.log("fetchvotes errors", error);
        });
    },
    [value]
  );

  // debugger;
  let fetchDiscussion = useCallback(async () => {
    await axios
      .get(
        `http://localhost:3000/api/discussions/?discussionId=${discussionId}`
      )
      .then((res) => {
        res.data.map((discussion: any) => {
          return setDiscussionName(discussion.name);
        });
      });
  }, []);

  console.log("votes cormparison", votes);
  const userVotes = (contributionId: any) => {
    console.log("contributionId when matching votes", contributionId);
    return votes.includes(contributionId);
  };

  let fetchContributions = useCallback(async () => {
    await axios
      .get(
        `http://localhost:3000/api/contributions/?discussionId=${discussionId}`
      )
      .then((res) => {
        setContributions(res.data);
      });
  }, [discussionId]);

  useEffect(() => {
    fetchDiscussion();
    fetchContributions();
  }, []);

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
      <div className="zg-discussion-header">
        <h2 className="zg-current-discussion-header">{discussionName} </h2>
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
