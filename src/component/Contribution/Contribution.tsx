import React, { useEffect, useCallback, useState, useContext } from "react";

import { SimpleCtx } from "../../context/UserContext";

import Vote from "../Vote/Vote";
import EditContributionModal from "../EditContributionModal/EditContributionModal";
import DeleteContribution from "../DeleteContribution/DeleteContribution";
import axios from "axios";

import "./Contribution.scss";

interface ContributionProps {
  contributionId: number | null;
  contributionCreator: number | null;
  points: number;
  initialVote: boolean;
  contribution: string;
  discussionName: string;
}

const Contribution: React.FC<ContributionProps> = (
  props: ContributionProps
) => {
  const [contributionCreator, setContributionCreator] = useState<string>("");

  let value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;
  console.log(baseUrl);

  useEffect(() => {
    fetchContributionCreator();
  }, []);

  let fetchContributionCreator = useCallback(async () => {
    await axios
      .get(`${baseUrl}/api/users/?userId=${props.contributionCreator}`)
      .then((response: any) => {
        setContributionCreator(response.data);
      });
  }, []);

  return (
    <div className="zg-contribution-container">
      <Vote
        contributionId={props.contributionId}
        points={props.points}
        initialVote={props.initialVote}
      />
      <div className="zg-content-and-author">
        <EditContributionModal
          contributionCreator={props.contributionCreator}
          discussionName={props.discussionName}
          contributionId={props.contributionId}
          contribution={props.contribution}
        />
        <span className="zg-contribution-creator">
          Author: {contributionCreator}
        </span>
      </div>
      {value?.id == props.contributionCreator ? (
        <DeleteContribution
          points={props.points}
          contributionId={props.contributionId}
        />
      ) : (
        <div style={{minWidth: "30px"}}></div>
      )}
    </div>
  );
};

export default Contribution;
