import React, { useState } from "react";

import axios from "axios";

import "./Vote.scss";

import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

interface VoteProps {
  contributionId: number | null;
  points: number;
  initialVote: boolean;
}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [voted, setVoted] = useState<boolean>(props.initialVote);

  const [points, setPoints] = useState<number>(props.points);

  let deleteConfig = { userId: 1, contributionId: props.contributionId}

  let removeVote = async () => {
    await axios
      .put(`http://localhost:3000/api/subtractPointFromContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .delete(`http://localhost:3000/api/removeVoteFromRecord`, {data: deleteConfig}).then((res) => {
        console.log(res.status);
      });
      setPoints(points - 1);
  };

  let addVote = async () => {
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
      setPoints(points + 1);
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
    <Button
      style={{ color: voted ? "#B50097" : "grey" }}
      onClick={() => castVote()}
    >
      <ArrowUpwardIcon className="zg-vote-arrow" />
      <span className="zg-points">{points}</span>
    </Button>
  );
};

export default Vote;
