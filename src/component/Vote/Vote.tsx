import React, { useState } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import axios from "axios";

import { Tooltip, IconButton } from "@material-ui/core";

import "./Vote.scss";

interface VoteProps {
  contributionId: number | null;
  points: number;
  initialVote: boolean;
}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [voted, setVoted] = useState<boolean>(props.initialVote);

  const [points, setPoints] = useState<number>(props.points);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  let deleteConfig = { userId: 1, contributionId: props.contributionId };

  let removeVote = async () => {
    console.log("remove a vote");
    setPoints(points - 1);
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);

    await axios
      .put(`http://localhost:3000/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: false,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .delete(`http://localhost:3000/api/votes`, {
        data: deleteConfig,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  let addVote = async () => {
    console.log("add a vote");
    setVoteDisabled(true);
    setPoints(points + 1);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);
    await axios
      .put(`http://localhost:3000/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: true,
      })
      .then((res) => {
        console.log(res.status);
      });
    await axios
      .post(`http://localhost:3000/api/votes`, {
        userId: 1,
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  const castVote = () => {
    setVoted(!voted);
    if (voted) {
      removeVote();
    } else {
      addVote();
    }
  };

  return (
    <div className="zg-vote-container">
      {voteDisabled ? (
        <CheckCircleIcon
          style={{ color: voted ? "#24519b" : "grey", height: "15px" }}
          className="zg-vote-check"
        />
      ) : (
        ""
      )}
      <Tooltip title={voted ? "Remove Vote" : "Vote"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? "#24519b" : "grey",
              height: "30px",
              width: "30px",
            }}
            aria-label="vote"
            onClick={() => castVote()}
          >
            <ArrowUpwardIcon
              style={{ height: "20px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </span>
      </Tooltip>
      <span style={{ color: voted ? "#24519b" : "grey" }} className="zg-points">
        {points}
      </span>
    </div>
  );
};

export default Vote;
