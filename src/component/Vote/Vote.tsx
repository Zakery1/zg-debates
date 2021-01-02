import React from "react";

import "./Vote.scss";

import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";


interface VoteProps {
//     id: number | null;
    contributionId?: number | null;
    // userId: number | null;
    // discussionId: number | null;
    // contribution: string;
    // agree: boolean | null;
    // neutral: boolean | null;
    // disagree: boolean | null;
    points: number | null;
  }


const Vote: React.FC<VoteProps> = (props: VoteProps) => {

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

  return (
    <Button
    //   className={
    //     "zg-vote-button " + (userVotes(disagreeItem.id) ? "zg-voted" : "")
    //   }
    //   onClick={() => clickArrow(disagreeItem.id, disagreeItem.points)}
    >
      <ArrowUpwardIcon />
      <span>{props.points}</span>
    </Button>
  );
};

export default Vote;
