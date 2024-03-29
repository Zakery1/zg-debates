import React, { useState, useEffect, useCallback, useContext } from "react";

import { SimpleCtx } from "../../context/UserContext";

import axios from "axios";

import { useParams } from "react-router-dom";

import { IconButton } from "@material-ui/core";

import FileCopyIcon from "@material-ui/icons/FileCopy";

import CreateContribution from "../CreateContribution/CreateContribution";
import Contribution from "../Contribution/Contribution";

import "./CurrentDiscussion.scss";

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

const CurrentDiscussion: React.FC = () => {
  const [discussionName, setDiscussionName] = useState("");

  const [contributions, setContributions] = useState<ContributionsArray>([
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

  const { discussionId } = useParams<{ discussionId: string | undefined }>();
  // debugger;

  let value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  // debugger;
  let fetchDiscussion = useCallback(async () => {
    await axios
      .get(`${baseUrl}/api/discussions/?discussionId=${discussionId}`)
      .then((res) => {
        res.data.map((discussion: any) => {
          return setDiscussionName(discussion.name);
        });
      });
  }, [discussionId, baseUrl]);

  let fetchContributions = useCallback(async () => {
    await axios
      .get(`${baseUrl}/api/contributions/?discussionId=${discussionId}`)
      .then((res) => {
        // console.log("CONTRIBUTION RESOURCE", res.data)
        setContributions(res.data);
      });
  }, [discussionId, baseUrl]);

  const copyLink = () => {
    return navigator.clipboard.writeText(
      `https://hyperbolia.com/discussion/${discussionId}`
    );
  };

  useEffect(() => {
    fetchDiscussion();
    fetchContributions();
  }, [fetchDiscussion, fetchContributions, value?.id]);

  let agreeList = contributions
    .filter((contribution) => contribution.agree === true)
    .map((agreeItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          contributionCreator={agreeItem.userId}
          key={agreeItem.id}
          contributionId={agreeItem.id}
          points={agreeItem.points}
          contribution={agreeItem.contribution}
          hyperboles={agreeItem.hyperboles}
          trolls={agreeItem.trolls}
        />
      );
    });

  let neutralList = contributions
    .filter((contribution) => contribution.neutral === true)
    .map((neutralItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          contributionCreator={neutralItem.userId}
          key={neutralItem.id}
          contributionId={neutralItem.id}
          points={neutralItem.points}
          contribution={neutralItem.contribution}
          hyperboles={neutralItem.hyperboles}
          trolls={neutralItem.trolls}
        />
      );
    });

  let disagreeList = contributions
    .filter((contribution) => contribution.disagree === true)
    .map((disagreeItem) => {
      return (
        <Contribution
          discussionName={discussionName}
          contributionCreator={disagreeItem.userId}
          key={disagreeItem.id}
          contributionId={disagreeItem.id}
          points={disagreeItem.points}
          contribution={disagreeItem.contribution}
          hyperboles={disagreeItem.hyperboles}
          trolls={disagreeItem.trolls}
        />
      );
    });

  return (
    <div className="zg-current-discussion">
      <div className="zg-discussion-header">
        <div className="zg-current-discussion-title">{discussionName} </div>

        <div className="zg-link-and-create-holder">
          <CreateContribution
            discussionName={discussionName}
            fetchContributions={fetchContributions}
          />
          <div className="zg-copy-link">
            <IconButton
              style={{ fontSize: "14px", padding: "0 0", borderRadius: "4px" }}
              onClick={() => copyLink()}
            >
              Copy link to discussion{" "}
              <FileCopyIcon style={{ fontSize: "14px", marginLeft: "5px" }} />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="zg-position-container">
        <div className="zg-list zg-list-agree">
          <h4>Agree</h4>
          {agreeList}
        </div>
        <div className="zg-list zg-list-neutral">
          <h4>Neutral</h4>
          {neutralList}
        </div>
        <div className="zg-list zg-list-disagree">
          <h4>Disagree</h4>
          {disagreeList}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CurrentDiscussion;
