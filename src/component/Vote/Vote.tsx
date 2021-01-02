import React, { useState } from "react";

import "./Vote.scss";

import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

interface VoteProps {
  contributionId?: number | null;
  points: number | null;
}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
//get votes from user component

  //   let updateVotes = async () => {};

  // const userVotes = (contributionId: any) => {
  //     // return votes.includes(contributionId);
  //   };

  //   let clickArrow = (contributionId: any, points: number) => {
  //     const elementIndex = contributions.findIndex(
  //       (element) => element.id === contributionId
  //     );
  //     let updatedContributions = [...contributions];
  //     if (userVotes(contributionId)) {
  //       setVotes(votes.filter((id) => id !== contributionId));
  //       updatedContributions[elementIndex] = {
  //         ...updatedContributions[elementIndex],
  //         points: points - 1,
  //       };
  //     } else {
  //       setVotes([...votes, contributionId]);
  //       updatedContributions[elementIndex] = {
  //         ...updatedContributions[elementIndex],
  //         points: points + 1,
  //       };
  //     }
  //     setContributions(updatedContributions);
  //   };

  const [voted, setVoted] = useState<boolean>(false);

  return (
    <Button
      style={{ color: voted ? "#B50097" : "grey" }}
      onClick={() => setVoted(!voted)}
    >
      <ArrowUpwardIcon className="zg-vote-arrow" />
      <span className="zg-points">{props.points}</span>
    </Button>
  );
};

export default Vote;
