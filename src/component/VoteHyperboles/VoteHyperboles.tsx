import React from "react";

import "./VoteHyperboles.scss";

interface HyperbolesProps {
    hyperboles: number;
    contributionId: number | null;
}

const VoteHyperboles: React.FC<HyperbolesProps> = (props: HyperbolesProps) => {
    return <div className="zg-vote-hyperboles">VoteHyperboles {props.hyperboles}</div>
}

export default VoteHyperboles;