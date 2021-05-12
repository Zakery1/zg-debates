import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import "./User.scss";

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

  const getUserContributions = async () => {
    await axios
      .get(`${baseUrl}/api/contributions/?userId=${value?.id}`)
      .then((res) => {
        // console.log("CONTRIBUTION RESOURCE", res.data)
        setUserContributions(res.data);
      });
  };

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
  userContributions.filter((item) => item.userId == value?.id).map((contribution) => {
      return (
        <div key={contribution.id} className="zg-user-contribution-item">
          <div>
            {contribution.contribution}
            {contribution.points}
            {contribution.hyperboles}
            {contribution.trolls}
            <button>delete</button>
          </div>
          <Link to={`/discussion/${contribution.discussionId}`}>
            Go to discussion
          </Link>
        </div>
      );
    });

  return (
    <div className="zg-user">
      User
      <div>
        <div className="zg-user-contribution-list">
        {contributionList()}
        </div>

        <br />
        <Link className="zg-logout" to="/" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default User;
