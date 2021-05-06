import React, { useState, useContext, useEffect, useCallback } from "react";

import "./VotePoints.scss";
import { Tooltip, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

interface UserVote {
  contributionId: number;
  voteDate: string;
  voteType: number;
}

interface UserVotesArray extends Array<UserVote> {}

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

  const votingConfigs = [{ voteType: 1, color: "#24519b", message: "Vote" }];

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
  };

  useEffect(() => {
  }, []);



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
    console.log("Got Here 1");
    await axios
      .put(`${baseUrl}/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: false,
        voteType: voteType,
      })
      .then((res) => {
        console.log("Got Here 2");
        console.log(res.status);
      });

    await axios
      .delete(`${baseUrl}/api/votes`, {
        data: deleteConfig,
      })
      .then((res) => {
        console.log("Got Here 3");
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
              color: voted ? "#24519b" : "grey",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(1) : alert("You must be logged in to vote.")
            }
          >
            <ArrowUpwardIcon
              style={{ height: "15px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </span>
      </Tooltip>
      <span style={{ color: voted ? "#24519b" : "grey" }} className="zg-points">
        {points || "0"}
        {/* need to display trolls and hyperboles */}
      </span>
    </div>
  );
};

export default VotePoints;
