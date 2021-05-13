import React, { useEffect, useState, useContext } from "react";

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
  contribution: string;
  discussionName: string;
  hyperboles: number;
  trolls: number;
}

const Contribution: React.FC<ContributionProps> = (
  props: ContributionProps
) => {
  const [contributionCreator, setContributionCreator] = useState<string>("");

  let value = useContext(SimpleCtx);

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  useEffect(() => {
    let mounted = true;

    let fetchContributionCreator = async () => {
      await axios
        .get(`${baseUrl}/api/users/?userId=${props.contributionCreator}`)
        .then((response: any) => {
          if (mounted) {
            setContributionCreator(response.data);
          }
        });
    };

    fetchContributionCreator();

    return () => {
      mounted = false;
    };
  }, [baseUrl, props.contributionCreator]);

  return (
    <div className="zg-contribution-container">
      <div className="zg-content-and-author">
        <div className="zg-vote-section">
          <Vote
            contributionId={props.contributionId}
            points={props.points}
            hyperboles={props.hyperboles}
            trolls={props.trolls}
          />
        </div>
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
      {+value?.id === props.contributionCreator ? (
        <DeleteContribution
          contributionId={props.contributionId}
          points={props.points}
          hyperboles={props.hyperboles}
          trolls={props.trolls}
        />
      ) : (
        <div style={{ minWidth: "30px" }}></div>
      )}
    </div>
  );
};

export default Contribution;
