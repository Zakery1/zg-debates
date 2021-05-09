import React, { useState, useContext, useEffect, useCallback } from "react";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import VoteHyperboles from "../VoteHyperboles/VoteHyperboles";
import VotePoints from "../VotePoints/VotePoints";

import VoteTrolls from "../VoteTrolls/VoteTrolls";

import "./Vote.scss";

interface VoteProps {
  contributionId: number | null;
  points: number;
  hyperboles: number;
  trolls: number;
}

interface UserVote {
  contributionId: number;
  voteDate: string;
  voteType: number;
}

interface UserVotesArray extends Array<UserVote> {}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  /////////////
  const [pointed, setPointed] = useState<boolean | null>(false);
  const [hyperboled, setHyperboled] = useState<boolean | null>(false);
  const [trolled, setTrolled] = useState<boolean | null>(false);

  const [userVotes, setUserVotes] = useState<UserVotesArray>([
    {
      contributionId: 0,
      voteDate: "",
      voteType: 0,
    },
  ]);

  const value = useContext(SimpleCtx);

  const fetchUserVotes = useCallback(
    async (userId) => {
      if (!userId) {
        return;
      } else {
        await axios
          .get(`${baseUrl}/api/votes/?userId=${userId}`)
          .then((response) => {
            setUserVotes(response.data);
          });
      }
    },
    [baseUrl]
  );



  useEffect(() => {
    fetchUserVotes(value?.id);
  }, [fetchUserVotes, value?.id]);

  useEffect(() => {
    const checkPointed = () => {
      let pointedStatus = userVotes.find(
        (item) =>
          item.contributionId === props.contributionId && item.voteType === 1
      );
  
      if (pointedStatus) {
        setPointed(true);
      }
    };
    checkPointed();
  }, [props.contributionId, userVotes]);

  useEffect(() => {
    const checkHyperboled = () => {
      let hyperboledStatus = userVotes.find(
        (item) =>
          item.contributionId === props.contributionId && item.voteType === 2
      );
  
      if (hyperboledStatus) {
        setHyperboled(true);
      }
    };
    checkHyperboled();
  }, [props.contributionId, userVotes]);

  useEffect(() => {
    const checkTrolled = () => {
      let trolledStatus = userVotes.find(
        (item) =>
          item.contributionId === props.contributionId && item.voteType === 3
      );
  
      if (trolledStatus) {
        setTrolled(true);
      }
    };
    checkTrolled();
  }, [props.contributionId, userVotes]);

  return (
    <div className="zg-vote-container">
          <VotePoints
            contributionId={props.contributionId}
            points={props.points}
            pointed={pointed}
          />
          <VoteHyperboles
            contributionId={props.contributionId}
            hyperboles={props.hyperboles}
            hyperboled={hyperboled}
          />
          <VoteTrolls
            contributionId={props.contributionId}
            trolls={props.trolls}
            trolled={trolled}
          />
    </div>
  );
};

export default Vote;
