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
    setPoints(points - 1);
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);

    await axios
      .put(`http://localhost:3000/api/subtractPointFromContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .delete(`http://localhost:3000/api/removeVoteFromRecord`, {
        data: deleteConfig,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  let addVote = async () => {
    setVoteDisabled(true);
    setPoints(points + 1);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);
    await axios
      .put(`http://localhost:3000/api/addPointToContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });
    await axios
      .post(`http://localhost:3000/api/addVoteToRecord`, {
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
          style={{ color: voted ? "#B50097" : "grey", height: "15px" }}
          className="zg-vote-check"
        />
      ) : (
        ""
      )}
      <Tooltip title={voted ? "Remove Vote" : "Vote"}>
        <IconButton
          disabled={voteDisabled}
          style={{
            color: voted ? "#B50097" : "grey",
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
      </Tooltip>
      <span style={{ color: voted ? "#B50097" : "grey" }} className="zg-points">
        {points}
      </span>
    </div>
  );
};

export default Vote;
