import React, { useState } from "react";

import axios from "axios";

import "./Vote.scss";

import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

interface VoteProps {
  contributionId?: number | null;
  points: number | null;
  initialVote: boolean;
}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [voted, setVoted] = useState<boolean>(props.initialVote);

  let removeVote = async () => {
    await axios
      .put(`http://localhost:3000/api/subtractPointFromContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });

    // setUpdatedContribution("");
    // handleClose();
    // window.location.reload();
  };

  let addVote = async () => {
    await axios
      .put(`http://localhost:3000/api/addPointToContribution`, {
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
      //add vote, addPointToContribution and addVoteToRecord
    }
  };

  return (
    <Button
      style={{ color: voted ? "#B50097" : "grey" }}
      onClick={() => castVote()}
    >
      <ArrowUpwardIcon className="zg-vote-arrow" />
      <span className="zg-points">{props.points}</span>
    </Button>
  );
};

export default Vote;
