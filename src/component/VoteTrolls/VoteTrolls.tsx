import React, { useState, useContext } from "react";

import "./VoteTrolls.scss";
import { SimpleCtx } from "../../context/UserContext";
import axios from "axios";
import { Tooltip, IconButton } from "@material-ui/core";

interface TrollsProps {
  trolls: number;
  contributionId: number | null;
  trolled: boolean | null;
}

const VoteTrolls: React.FC<TrollsProps> = (props: TrollsProps) => {
  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;


  const [voted, setVoted] = useState<boolean | null>(props.trolled);

  const [trolls, setTrolls] = useState<number>(props.trolls);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
    voteType: 3,
  };

  const castVote = (voteType: number) => {
    setVoteDisabled(true);
    setTimeout(() => {
      setVoteDisabled(false);
    });
    if (voted) {
      setVoted(false);
      setTrolls(trolls - 1);
      return removeVote(voteType);
    } else {
      setVoted(true);
      setTrolls(trolls + 1);
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
    <div className="zg-vote-trolls">
      <Tooltip title={voted ? "Remove Troll" : "Troll"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              background: voted ? "#720000" : "white",
              color: voted ? "grey" : "#720000",
              border: "2px solid #720000",
              height: "10px",
              width: "10px"
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(3) : alert("You must be logged in to vote.")
            }
          >
            <div
              style={{ color: voted ? "white" : "#720000" }}
              className="zg-trolls"
            >
              {trolls || 0}
            </div>
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};

export default VoteTrolls;
