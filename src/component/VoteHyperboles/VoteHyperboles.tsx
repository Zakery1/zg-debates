import React, { useState, useContext } from "react";

import "./VoteHyperboles.scss";
import { SimpleCtx } from "../../context/UserContext";
import axios from "axios";
import { Tooltip, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";


interface HyperbolesProps {
    hyperboles: number;
    contributionId: number | null;
}

const VoteHyperboles: React.FC<HyperbolesProps> = (props: HyperbolesProps) => {
    const baseUrl = process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [voted, setVoted] = useState<boolean | null>(null);

  const [hyperboles, setHyperboles] = useState<number>(props.hyperboles);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const votingConfigs = [{ voteType: 1, color: "#726A00", message: "Hyperbole" }];

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
  };

  const castVote = (voteType: number) => {
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    });
    if (voted) {
      setVoted(false);
      setHyperboles(hyperboles - 1);
      return removeVote(voteType);
    } else {
      setVoted(true);
      setHyperboles(hyperboles + 1);
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
    <div className="zg-vote-hyperboles">
      <Tooltip title={voted ? "Remove Hyperbole" : "Hyperbole"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? "#726A00" : "grey",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(2) : alert("You must be logged in to vote.")
            }
          >
            <ArrowUpwardIcon
              style={{ height: "15px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </span>
      </Tooltip>
      <span style={{ color: voted ? "#726A00" : "grey" }} className="zg-hyperboles">
        
        {hyperboles || "0"}
        {/* need to display hyperboles and hyperboles */}
      </span>
    </div>
  );
};

export default VoteHyperboles;