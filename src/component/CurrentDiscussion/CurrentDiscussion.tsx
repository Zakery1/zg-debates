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

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  let fetchVotes = useCallback(
    async (userId) => {
      await axios
        .get(`${baseUrl}/api/votes/?userId=${userId}`)
        .then((res) => {
          let contributionIds = res.data.map((contribution: any) => {
            return contribution.contributionId;
          });
          return setVotes((prevVotes) => [...prevVotes, ...contributionIds]);
        })
        .catch((error) => {
          console.log("fetchvotes errors", error);
        });
    },
    [baseUrl]
  );

  // debugger;
  let fetchDiscussion = useCallback(async () => {
    await axios
      .get(`${baseUrl}/api/discussions/?discussionId=${discussionId}`)
      .then((res) => {
        res.data.map((discussion: any) => {
          return setDiscussionName(discussion.name);
        });
      });
  }, [discussionId, baseUrl]);

  const userVotes = (contributionId: any) => {
    console.log("votes", votes)
    return votes.includes(contributionId);
  };

  let fetchContributions = useCallback(async () => {
    await axios
      .get(`${baseUrl}/api/contributions/?discussionId=${discussionId}`)
      .then((res) => {
        setContributions(res.data);
      });
  }, [discussionId, baseUrl]);


  useEffect(() => {
    fetchDiscussion();
    fetchContributions();
  }, [fetchDiscussion, fetchContributions, fetchVotes, value?.id]);

  useEffect(() => {
    if (value?.id) {
      fetchVotes(value?.id);
    }
  }, [value?.id, fetchVotes]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      // const voted = votes.filter((vote) => {
      //   return vote === agreeItem.id as IVote;
      // })
      console.log("agree item comparision", agreeItem.id)
      return (
        <Contribution
          discussionName={discussionName}
          contributionCreator={agreeItem.userId}
          key={agreeItem.id}
          contributionId={agreeItem.id}
          points={agreeItem.points}
          initialVote={true}
          contribution={agreeItem.contribution}
        />
      );
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      console.log("neautral item comparision", neutralItem.id)
      return (
        <Contribution
          discussionName={discussionName}
          contributionCreator={neutralItem.userId}
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
          contributionCreator={disagreeItem.userId}
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
        <br />
      </div>
      <div className="zg-position-container">
        <div className="zg-list zg-list-agree">
          <h4>Agree</h4>
          {agreeList}
          <CreateContribution
            discussionName={discussionName}
            fetchContributions={fetchContributions}
          />
        </div>
        <div className="zg-list zg-list-neutral">
          <h4>Neutral</h4>
          {neutralList}
          <CreateContribution
            discussionName={discussionName}
            fetchContributions={fetchContributions}
          />
        </div>
        <div className="zg-list zg-list-disagree">
          <h4>Disagree</h4>
          {disagreeList}
          <CreateContribution
            discussionName={discussionName}
            fetchContributions={fetchContributions}
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CurrentDiscussion;
