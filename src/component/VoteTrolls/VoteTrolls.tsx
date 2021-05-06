import React, { useState, useContext } from "react";

import "./VoteTrolls.scss";
import { SimpleCtx } from "../../context/UserContext";
import axios from "axios";
import { Tooltip, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";


interface TrollsProps {
    trolls: number;
    contributionId: number | null;
    trolled: boolean | null;
}

const VoteTrolls: React.FC<TrollsProps> = (props: TrollsProps) => {
    const baseUrl = process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [voted, setVoted] = useState<boolean | null>(props.trolled);
  // console.log("voted IN TRolled",  voted)

  const [trolls, setTrolls] = useState<number>(props.trolls);

  const [voteDisabled, setVoteDisabled] = useState<boolean>(false);

  const value = useContext(SimpleCtx);

  let deleteConfig = {
    userId: value?.id,
    contributionId: props.contributionId,
    voteType: 3
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
        console.log( res.status)
      });

    await axios
      .post(`${baseUrl}/api/votes`, {
        userId: value?.id,
        contributionId: props.contributionId,
        voteType: voteType,
      })
      .then((res) => {
        console.log( res.status);
      });
  };

  return (
    <div className="zg-vote-trolls">
      <Tooltip title={voted ? "Remove Troll" : "Troll"}>
        <span>
          <IconButton
            disabled={voteDisabled}
            style={{
              color: voted ? "#720000" : "grey",
              height: "15px",
              width: "15px",
            }}
            aria-label="vote"
            onClick={() =>
              value?.id ? castVote(3) : alert("You must be logged in to vote.")
            }
          >
            <ArrowUpwardIcon
              style={{ height: "15px" }}
              className="zg-vote-arrow"
            />
          </IconButton>
        </span>
      </Tooltip>
      <span style={{ color: voted ? "#720000" : "grey" }} className="zg-trolls">
        {trolls || 0}
        {/* need to display trolls and hyperboles */}
      </span>
    </div>
  );
};


export default VoteTrolls;