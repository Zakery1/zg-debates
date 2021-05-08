import React, { useState, useContext } from "react";

import "./VotePoints.scss";
import { Tooltip, IconButton } from "@material-ui/core";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

interface VotePointsProps {
  points: number;
  contributionId: number | null;
  pointed: boolean | null;
}

const VotePoints: React.FC<VotePointsProps> = (props: VotePointsProps) => {
  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [voted, setVoted] = useState<boolean | null>(props.pointed);

  const [points, setPoints] = useState<number>(props.points);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
    voteType: 1,
  };

  const castVote = (voteType: number) => {
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    });
    if (voted) {
      setVoted(false);
      setPoints(points - 1);
      return removeVote(voteType);
    } else {
      setVoted(true);
      setPoints(points + 1);
      return addVote(voteType);
    }
  };

  let removeVote = async (voteType: number) => {
    await axios
      .put(`${baseUrl}/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: false,
        voteType: voteType,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .delete(`${baseUrl}/api/votes`, {
        data: deleteConfig,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  let addVote = async (voteType: number) => {
    await axios
      .put(`${baseUrl}/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: true,
        voteType: voteType,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .post(`${baseUrl}/api/votes`, {
        userId: value?.id,
        contributionId: props.contributionId,
        voteType: voteType,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  return (
    <div className="zg-vote-points">
      <Tooltip title={voted ? "Remove Vote" : "Vote"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              background: voted ? "#24519b" : "white",
              color: voted ? "grey" : "#24519b",
              border: "2px solid #24519b",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(1) : alert("You must be logged in to vote.")
            }
          >
            <span
              style={{ color: voted ? "white" : "#24519b" }}
              className="zg-points"
            >
              {points || "0"}
            </span>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default VotePoints;
