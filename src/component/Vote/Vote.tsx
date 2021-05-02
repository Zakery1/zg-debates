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
  hyperboles: number;
  trolls: number;
}

interface UserVote {
  contributionId: number;
  voteType: number;
}

interface VotesArray extends Array<UserVote> {}

const Vote: React.FC<VoteProps> = (props: VoteProps) => {

  const votingConfigs = [
    { voteType: 1, color: "#24519b", message: "Vote" },
    { voteType: 2, color: "#720000", message: "Hyperbole" },
    { voteType: 3, color: "#726A00", message: "Troll" },
  ];

  const [voted, setVoted] = useState<boolean | null>(null);
  const [hyperboled, setHyperboled] = useState<boolean | null>(null);
  const [trolled, setTrolled] = useState<boolean | null>(null);


  const [points, setPoints] = useState<number>(props.points);
  const [hyperboles, setHyperboles] = useState<number>(props.hyperboles);
  const [trolls, setTrolls] = useState<number>(props.trolls);

  const [userPoints, setUserPoints] = useState<VotesArray>([]);
  const [userHyperboles, setUserHyperboles] = useState<VotesArray>([]);
  const [userTrolls, setUserTrolls] = useState<VotesArray>([]);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);
  
  const value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
  };




  const fetchUserVotes = useCallback(async (userId) => {
    if (!userId) {
      return;
    } else {
      await axios
        .get(`${baseUrl}/api/votes/?userId=${userId}`)
        .then((response) => {
          response.data.map((vote: UserVote)=> {
            if(vote.voteType === 1) {
              setUserPoints((exhistingPoints =>[...exhistingPoints, vote]))
            }

        })});
  }}, [baseUrl, value?.id]);


  const checkVotes = useCallback(
    (contributionId: any) => {
      let votedStatus = userPoints.find(
        (item) => item.contributionId === contributionId
      );
      if (votedStatus?.contributionId) {
        return setVoted(true);
      } else {
        return;
      }
    },
    [userPoints]
  );









  useEffect(() => {
    fetchUserVotes(value?.id);
  }, [fetchUserVotes]);

  useEffect(() => {
    checkVotes(props.contributionId);
  }, [props.contributionId, checkVotes]);

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

  //toggle voted and invoke method of api calls
  const castVote = (voteType: number) => {

    if (voteType === 1) {
      setVoteDisabled(true);
      setTimeout(() => {
        setVoteDisabled(false);
      }, 2000);

      if (voted) {
        setVoted(false);
        setPoints(points - 1);
        return removeVote(voteType);
      } else {
        setVoted(true);
        setPoints(points + 1);
        return addVote(voteType);
      }
    }

    if (voteType === 2) {
      setVoteDisabled(true);
      setTimeout(() => {
        setVoteDisabled(false);
      }, 2000);

      if (voted) {
        setHyperboled(false);
        setHyperboles(hyperboles - 1);
        return removeVote(voteType);
      } else {
        setHyperboled(true);
        setHyperboles(hyperboles + 1);
        return addVote(voteType);
      }
    }


    //add here for vote type 3
  };


  //This map needs to be able to talk to the three types of voting
  const voteOptions = votingConfigs.map((voteType) => {
    return (
      <span key={voteType.color}>
        <Tooltip
          title={voted ? `Remove ${voteType.message}` : `${voteType.message}`}
        >
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? `${voteType.color}` : "grey",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id
                ? castVote(voteType.voteType)
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
          style={{ color: voted ? `${voteType.color}` : "grey" }}
          className="zg-points"
        >
          {/* need to display trolls and hyperboles */}
          {points}
        </span>
      </span>
    );
  });

  return <div className="zg-vote-container">{voteOptions}</div>;
};

export default Vote;
