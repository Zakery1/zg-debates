import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import DeleteContribution from "../DeleteContribution/DeleteContribution";

import Contribution from "../Contribution/Contribution";

import "./User.scss";
import { ListItemSecondaryAction } from "@material-ui/core";

interface ContributionItem {
  id: number | null;
  userId: number | null;
  discussionId: number | null;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number;
  contributionDate: string | null;
  hyperboles: number;
  trolls: number;
}

interface ContributionsArray extends Array<ContributionItem> {}

const User: React.FC = () => {
  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const [
    userContributions,
    setUserContributions,
  ] = useState<ContributionsArray>([
    {
      id: null,
      userId: null,
      discussionId: null,
      contribution: "",
      agree: null,
      neutral: null,
      disagree: null,
      points: 0,
      contributionDate: null,
      hyperboles: 0,
      trolls: 0,
    },
  ]);

  const value = useContext(SimpleCtx);

  // const getUserContributions = async () => {
  //   await axios
  //     .get(`${baseUrl}/api/contributions/?userId=${value?.id}`)
  //     .then((res) => {
  //       // console.log("CONTRIBUTION RESOURCE", res.data)
  //       setUserContributions(res.data);
  //     });
  // };

  const logout = async () => {
    await axios.post(`${baseUrl}/api/users/logout`).then((response) => {
      value?.setUsername(null);
      value?.setId(null);
      localStorage.clear();
    });
  };

  useEffect(() => {
    const getUserContributions = async () => {
      await axios
        .get(`${baseUrl}/api/contributions/?userId=${value?.id}`)
        .then((res) => {
          setUserContributions(res.data);
        });
    };
    getUserContributions();
  }, []);

  let contributionList = () =>
    userContributions.map((contribution) => {
      // console.log("contribution.userId === value?.id", contribution.userId, value?.id)
      if (contribution.userId == value?.id) {
        return (
          <div key={contribution.id} className="zg-contributions-container">
            <Contribution
              discussionName={" "}
              contributionCreator={contribution.userId}
              contributionId={contribution.id}
              points={contribution.points}
              contribution={contribution.contribution}
              hyperboles={contribution.hyperboles}
              trolls={contribution.trolls}
            />
            <Link
              className="zg-link zg-go-to-discussion"
              to={`/discussion/${contribution.discussionId}`}
            >
              Go to discussion
            </Link>
          </div>
        );
      } else {
        return;
      }
    });

  return (
    <div className="zg-user">
      <div className="zg-user-contribution-list">
        <div className="zg-contribution-list-header">My Contributions</div>

        <div>
          <div className="zg-user-contribution-list">{contributionList()}</div>
        </div>
      </div>
      <Link className="zg-link" to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

export default User;
