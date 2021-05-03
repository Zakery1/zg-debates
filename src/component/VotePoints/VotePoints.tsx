import React, { useState, useContext } from "react";

import "./VotePoints.scss";
import { Tooltip, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { SimpleCtx } from "../../context/UserContext";

interface VotePointsProps {
  points: number;
}


const VotePoints: React.FC<VotePointsProps> = (props: VotePointsProps) => {
  const [voted, setVoted] = useState<boolean | null>(null);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const votingConfigs = [{ voteType: 1, color: "#24519b", message: "Vote" }];

  const value = useContext(SimpleCtx);

  const castVote = (voteType: number) => {
      setVoteDisabled(true);
      setTimeout(() => {
        setVoteDisabled(false);
      });
    }
    //   if (voted) {
    //     setVoted(false);
    //     setPoints(points - 1);
    //     return removeVote(voteType);

    //   } else {

    //     setVoted(true);
    //     setPoints(points + 1);
    //     // return addVote(voteType);

    //   }
    // }


  return (
    <div className="zg-vote-points">
        <Tooltip title={voted ? "Remove Vote" : "Vote" }>
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? "#24519b" : "grey",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id
                ? castVote(1)
                : alert("You must be logged in to vote.")
            }
          >
            <ArrowUpwardIcon
              style={{ height: "15px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </Tooltip>
        <span
          style={{ color: voted ? "#24519b" : "grey" }}
          className="zg-points"
        >
            {"points"}
          {/* need to display trolls and hyperboles */}
        </span>

    </div>
  );
};

export default VotePoints;
