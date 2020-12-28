import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { useHistory, useParams } from "react-router-dom";

import Button from "@material-ui/core/Button";

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

  let deleteContribution = async (contributionId: any) => {
    await axios
      .delete(`http://localhost:8080/api/deleteContribution/${contributionId}`)
      .then((res) => {
        console.log(res.status);
      });
    fetchContributions();
  };

  let fetchContributions = useCallback(async () => {
    await axios
      .get(`http://localhost:8080/api/getContributions/${id}`)
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
      return (
        <div key={agreeItem.id}>
          {agreeItem.contribution}
          <button onClick={() => deleteContribution(agreeItem.id)}>
            Delete
          </button>
          <EditContributionModal
            contributionId={agreeItem.id}
            contribution={agreeItem.contribution}
          />
          <br />
          <br />
        </div>
      );
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      return (
        <div key={neutralItem.id}>
          {neutralItem.contribution}
          <button onClick={() => deleteContribution(neutralItem.id)}>
            Delete
          </button>
          <EditContributionModal
            contributionId={neutralItem.id}
            contribution={neutralItem.contribution}
          />
          <br />
          <br />
        </div>
      );
    });

  let disagreeList = contributions
    .filter((contribution) => contribution.disagree === true)
    .map((disagreeItem) => {
      return (
        <div key={disagreeItem.id}>
          {disagreeItem.contribution}

          <button onClick={() => deleteContribution(disagreeItem.id)}>
            Delete
          </button>
          <EditContributionModal
            contributionId={disagreeItem.id}
            contribution={disagreeItem.contribution}
          />
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
      <div className="zg-position-container">
        <div className="zg-agree">
          <h3>Agree</h3>
          {agreeList}
        </div>
        <div className="zg-neutral">
          <h3>Neutral</h3>
          {neutralList}
        </div>
        <div className="zg-disagree">
          <h3>Disagree</h3>
          {disagreeList}
        </div>
      </div>
      <br />

      <Contribution />
      <br />
      <Button
        className="zg-back-to-premises"
        type="button"
        onClick={() => history.goBack()}
      >
        Back to Discussions
      </Button>
      <br />
    </div>
  );
};

export default CurrentDiscussion;
