import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import Contribution from "../Contribution/Contribution";
import EditContributionModal from "../EditContributionModal/EditContributionModal";

import "./CurrentDiscussion.scss";

interface discussionParams {
  id: string;
}

interface ContributionItem {
  id: number | null;
  userId: number | null;
  discussionId: number | null;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number | null;
}

interface ContributionsArray extends Array<ContributionItem> {}

const CurrentDiscussion: React.FC = () => {
  const { id }: discussionParams = useParams();
  let history = useHistory();

  const [contributions, setContributions] = useState<ContributionsArray>([
    {
      id: null,
      userId: null,
      discussionId: null,
      contribution: "",
      agree: null,
      neutral: null,
      disagree: null,
      points: null,
    },
  ]);

  // let arrowUp = (contributionId: any) => {
  //   let selectedContribution = contributions.filter((contribution) => {
  //     if( d contribution.id === contributionId;

  //   });

  // };

  let deleteContribution = async (contributionId: any) => {
    await axios
      .delete(`http://localhost:3000/api/deleteContribution/${contributionId}`)
      .then((res) => {
        console.log(res.status);
      });
    fetchContributions();
  };

  let fetchContributions = useCallback(async () => {
    await axios
      .get(`http://localhost:3000/api/getContributions/${id}`)
      .then((res) => {
        setContributions(res.data);
      });
  }, [id]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      console.log(agreeItem.id)
      return (
        <div className="zg-contribution-holder" key={agreeItem.id}>
          <span>
            <span>{agreeItem.points}</span>
            <span>
              {" "}
              {} <ArrowUpwardIcon />
            </span>
          </span>
          <div className="zg-contribution-content">
            {agreeItem.contribution}
          </div>

          <EditContributionModal
            contributionId={agreeItem.id}
            contribution={agreeItem.contribution}
          />
          <button
            className="zg-delete-contribution"
            onClick={() => deleteContribution(agreeItem.id)}
          >
            <DeleteOutlinedIcon />
          </button>
          <br />
          <br />
        </div>
      );
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      return (
        <div className="zg-contribution-holder" key={neutralItem.id}>
          <span>{neutralItem.points}</span>
          <div className="zg-contribution-content">
            {neutralItem.contribution}
          </div>

          <EditContributionModal
            contributionId={neutralItem.id}
            contribution={neutralItem.contribution}
          />
          <button
            className="zg-delete-contribution"
            onClick={() => deleteContribution(neutralItem.id)}
          >
            <DeleteOutlinedIcon />
          </button>
          <br />
          <br />
        </div>
      );
    });

  let disagreeList = contributions
    .filter((contribution) => contribution.disagree === true)
    .map((disagreeItem) => {
      return (
        <div className="zg-contribution-holder" key={disagreeItem.id}>
          <span>{disagreeItem.points}</span>
          <div className="zg-contribution-content">
            {disagreeItem.contribution}
          </div>

          <EditContributionModal
            contributionId={disagreeItem.id}
            contribution={disagreeItem.contribution}
          />
          <button
            className="zg-delete-contribution"
            onClick={() => deleteContribution(disagreeItem.id)}
          >
            <DeleteOutlinedIcon />
          </button>
          <br />
          <br />
        </div>
      );
    });

  return (
    <div className="zg-current-discussion">
      <h3 className="zg-current-discussion-header">
        Discusion title/argument will go here.
      </h3>
      <div className="zg-discussion-buttons">
        <Contribution />
        <br />
        <Button
          className="zg-back-to-premises"
          type="button"
          onClick={() => history.goBack()}
        >
          Discussions
        </Button>
      </div>

      <div className="zg-position-container">
        <div className="zg-list">
          <h3>Agree</h3>
          {agreeList}
        </div>
        <div className="zg-list">
          <h3>Neutral</h3>
          {neutralList}
        </div>
        <div className="zg-list">
          <h3>Disagree</h3>
          {disagreeList}
        </div>
      </div>
      <br />

      <br />
    </div>
  );
};

export default CurrentDiscussion;
