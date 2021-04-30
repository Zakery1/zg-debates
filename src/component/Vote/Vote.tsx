import React, { useState, useContext, useEffect, useCallback } from "react";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import axios from "axios";

import { Tooltip, IconButton } from "@material-ui/core";

import { SimpleCtx } from "../../context/UserContext";

import "./Vote.scss";

interface VoteProps {
  contributionId: number | null;
  points: number;
  hyperboles: number | null;
  trolls: number | null;
}

interface UserVote {
  contributionId: number;
  voteType: number;
}

interface VotesArray extends Array<UserVote> {}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [voted, setVoted] = useState<boolean | null>(null);

  const [points, setPoints] = useState<number>(props.points);
  const [hyperboles, setHyperboles] = useState<number | null>(props.hyperboles);
  const [trolls, setTrolls] = useState<number | null>(props.trolls);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const [userVotes, setUserVotes] = useState<VotesArray>([]);

  const value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
  };

  const fetchUserVotes = useCallback(async () => {
    if (value?.id) {
      await axios
        .get(`${baseUrl}/api/votes/?userId=${value?.id}`)
        .then((response) => {
          console.log("RESPONSE FOR USER VOTES", response.data);
          return setUserVotes(response.data);
        });
    } else {
      return;
    }
  }, [baseUrl, value?.id]);

  const checkVotes = useCallback(
    (contributionId: any) => {
      let votedStatus = userVotes.find(
        (item) => item.contributionId === contributionId
      );
      if (votedStatus?.contributionId) {
        return setVoted(true);
      } else {
        return;
      }
    },
    [userVotes]
  );

  useEffect(() => {
    fetchUserVotes();
  }, [fetchUserVotes]);

  useEffect(() => {
    checkVotes(props.contributionId);
  }, [props.contributionId, checkVotes]);

  let removeVote = async () => {
    setPoints(points - 1);
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);

    await axios
      .put(`${baseUrl}/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: false,
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

  let addVote = async () => {
    setVoteDisabled(true);
    setPoints(points + 1);
    setTimeout(() => {
      setVoteDisabled(false);
    }, 2000);

    await axios
      .put(`${baseUrl}/api/contributions`, {
        contributionId: props.contributionId,
        voteFor: true,
      })
      .then((res) => {
        console.log(res.status);
      });

    await axios
      .post(`${baseUrl}/api/votes`, {
        userId: value?.id,
        contributionId: props.contributionId,
        voteType: 1,
      })
      .then((res) => {
        console.log(res.status);
      });
  };

  const castVote = () => {
    if (voted) {
      setVoted(false);
      return removeVote();
    } else {
      setVoted(true);
      return addVote();
    }
  };

  return (
    <div className="zg-vote-container">
      <Tooltip title={voted ? "Remove Vote" : "Vote"}>
        <IconButton
          disabled={voteDisabled}
          style={{
            color: voted ? "#24519b" : "grey",
            height: "15px",
            width: "15px",
          }}
          aria-label="vote"
          onClick={() =>
            value?.id ? castVote() : alert("You must be logged in to vote.")
          }
        >
          <ArrowUpwardIcon
            style={{ height: "15px" }}
            className="zg-vote-arrow"
          />
        </IconButton>
      </Tooltip>

      <span style={{ color: voted ? "#24519b" : "grey" }} className="zg-points">

        {points}{" "}
      </span>
      <div>{trolls}</div>
      <div>{hyperboles}</div>
    </div>
  );
};

export default Vote;
