import React from "react";

import "./Contribution.scss";

import Vote from "../Vote/Vote";
import EditContributionModal from "../EditContributionModal/EditContributionModal";
import DeleteContribution from "../DeleteContribution/DeleteContribution";

interface ContributionProps {
  contributionId: number | null;
  points: number;
  initialVote: boolean;
  contribution: string;
  discussionName: string;
}

const Contribution: React.FC<ContributionProps> = (
  props: ContributionProps
) => {
  return (
    <div className="zg-contribution-container">
      <Vote
        contributionId={props.contributionId}
        points={props.points}
        initialVote={props.initialVote}
      />
      <EditContributionModal
        discussionName={props.discussionName}
        contributionId={props.contributionId}
        contribution={props.contribution}
      />
      <DeleteContribution
        points={props.points}
        contributionId={props.contributionId}
      />
    </div>
  );
};

export default Contribution;
