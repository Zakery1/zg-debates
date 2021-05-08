import React, { useState, useContext } from "react";

import "./VoteHyperboles.scss";
import { SimpleCtx } from "../../context/UserContext";
import axios from "axios";
import { Tooltip, IconButton } from "@material-ui/core";

interface HyperbolesProps {
  hyperboles: number;
  contributionId: number | null;
  hyperboled: boolean | null;
}

const VoteHyperboles: React.FC<HyperbolesProps> = (props: HyperbolesProps) => {
  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [voted, setVoted] = useState<boolean | null>(props.hyperboled);

  const [hyperboles, setHyperboles] = useState<number>(props.hyperboles);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
    voteType: 2,
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
    <div className="zg-vote-hyperboles">
      <Tooltip title={voted ? "Remove Hyperbole" : "Hyperbole"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              background: voted ? "#726A00" : "white",
              color: voted ? "grey" : "#726A00",
              border: "2px solid #726A00",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(2) : alert("You must be logged in to vote.")
            }
          >
            <span
              style={{ color: voted ? "white" : "#726A00" }}
              className="zg-hyperboles"
            >
              {hyperboles || "0"}
              {/* need to display hyperboles and hyperboles */}
            </span>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default VoteHyperboles;
