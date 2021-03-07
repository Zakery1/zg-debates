import React, { useEffect, useCallback, useState } from "react";

import "./Contribution.scss";

import Vote from "../Vote/Vote";
import EditContributionModal from "../EditContributionModal/EditContributionModal";
import DeleteContribution from "../DeleteContribution/DeleteContribution";
import axios from "axios";

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

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;
  console.log(baseUrl);

  useEffect(() => {
    fetchContributionCreator();
  }, []);

  let fetchContributionCreator = useCallback(async () => {
    console.log(
      "----------props.contributionCreator",
      props.contributionCreator
    );
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
      <div>
        <EditContributionModal
          contributionCreator={props.contributionCreator}
          discussionName={props.discussionName}
          contributionId={props.contributionId}
          contribution={props.contribution}
        />
        <span className="zg-contribution-creator">{contributionCreator}</span>
        
      </div>

      <DeleteContribution
        points={props.points}
        contributionId={props.contributionId}
      />
    </div>
  );
};

export default Contribution;
