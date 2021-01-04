import React, { useState } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  let deleteConfig = { userId: 1, contributionId: props.contributionId };

  let removeVote = async () => {
    setPoints(points - 1);
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);

    await axios
      .put(`https://fathomless-reaches-38159.herokuapp.com/api/subtractPointFromContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .delete(`https://fathomless-reaches-38159.herokuapp.com/api/removeVoteFromRecord`, {
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
      .put(`https://fathomless-reaches-38159.herokuapp.com/api/addPointToContribution`, {
        contributionId: props.contributionId,
      })
      .then((res) => {
        console.log(res.status);
      });
    await axios
      .post(`https://fathomless-reaches-38159.herokuapp.com/api/addVoteToRecord`, {
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
    <Button
      disabled={voteDisabled}
      style={{ color: voted ? "#B50097" : "grey", margin: "0", padding: "0" }}
      onClick={() => castVote()}
    >
      {voteDisabled ? <CheckCircleIcon style={{ color: "#rgb(128, 176, 56)", height: "15px"}} className="zg-vote-check" /> : ""}
      <ArrowUpwardIcon className="zg-vote-arrow" />

      <span className="zg-points">{points}</span>
    </Button>
  );
};

export default Vote;
