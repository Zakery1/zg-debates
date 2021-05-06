import React, { useState, useContext, useEffect, useCallback } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import axios from "axios";

import { Tooltip, IconButton } from "@material-ui/core";

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

interface VotesArray extends Array<UserVote> {}

interface UserVotesArray extends Array<UserVote> {}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const votingConfigs = [
    /////////////
    { voteType: 1, color: "#24519b", message: "Vote" },
    /////////////
    { voteType: 2, color: "#720000", message: "Hyperbole" },
    { voteType: 3, color: "#726A00", message: "Troll" },
  ];

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [showVotes, setShowVotes] = useState<boolean>(false);

  /////////////
  const [pointed, setPointed] = useState<boolean | null>(false);
  const [hyperboled, setHyperboled] = useState<boolean | null>(false);
  const [trolled, setTrolled] = useState<boolean | null>(false);

  // console.log("pointed, hyperboled, trolled", pointed, hyperboled, trolled);

  // const [points, setPoints] = useState<number>(props.points);
  const [hyperboles, setHyperboles] = useState<number>(props.hyperboles);

  const [trolls, setTrolls] = useState<number>(props.trolls);

  const [userVotes, setUserVotes] = useState<UserVotesArray>([
    {
      contributionId: 0,
      voteDate: "",
      voteType: 0,
    },
  ]);

  // const [userPoints, setUserPoints] = useState<VotesArray>([]);
  const [userHyperboles, setUserHyperboles] = useState<VotesArray>([]);
  const [userTrolls, setUserTrolls] = useState<VotesArray>([]);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
  };

  const fetchUserVotes = useCallback(
    async (userId) => {
      if (!userId) {
        return;
      } else {
        console.log("FETCHING VOTES");
        await axios
          .get(`${baseUrl}/api/votes/?userId=${userId}`)
          .then((response) => {
            setUserVotes(response.data);
            setShowVotes(true);
          });
      }
    },
    [baseUrl, value?.id]
  );

  const checkVotes = () => {
    let votedStatus = userVotes.find(
      (item) => item.contributionId === props.contributionId
    );
    if (votedStatus?.contributionId) {
      return setPointed(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchUserVotes(value?.id);
  }, [fetchUserVotes]);

  useEffect(() => {
    checkVotes();
  }, [checkVotes])

  return (
    <div className="zg-vote-container">
      {showVotes ? (
        <VotePoints
          pointed={pointed}
          contributionId={props.contributionId}
          points={props.points}
        />
      ) : (
        "no user votes"
      )}

      <VoteHyperboles
        contributionId={props.contributionId}
        hyperboles={props.hyperboles}
      />
      <VoteTrolls contributionId={props.contributionId} trolls={props.trolls} />
    </div>
  );
};

export default Vote;
