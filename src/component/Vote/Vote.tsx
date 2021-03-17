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
}

interface UserVote {
  contributionId: number;
}

interface VotesArray extends Array<UserVote> {}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {
  const [voted, setVoted] = useState<boolean | null>(null);

  const [points, setPoints] = useState<number>(props.points);

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
    await axios
      .get(`${baseUrl}/api/votes/?userId=${value?.id}`)
      .then((response) => {
        return setUserVotes(response.data);
      });
  }, [baseUrl, value?.id]);

  const checkVotes = useCallback(
    (contributionId: any) => {
      let votedStatus = userVotes.find(
        (item) => item.contributionId === contributionId
      );
      if(votedStatus?.contributionId)  {
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
      {voteDisabled ? (
        <CheckCircleIcon
          style={{ color: voted ? "#24519b" : "grey", height: "15px" }}
          className="zg-vote-check"
        />
      ) : (
        ""
      )}
      <Tooltip title={voted ? "Remove Vote" : "Vote"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? "#24519b" : "grey",
              height: "30px",
              width: "30px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote() : alert("You must be logged in to vote.")
            }
          >
            <ArrowUpwardIcon
              style={{ height: "20px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </span>
      </Tooltip>
      <span style={{ color: voted ? "#24519b" : "grey" }} className="zg-points">
        {points}
      </span>
    </div>
  );
};

export default Vote;
