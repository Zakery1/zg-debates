import React from "react";

import "./VoteTrolls.scss";

interface TrollsProps {
    trolls: number;
}

const VoteTrolls: React.FC<TrollsProps> = (props: TrollsProps) => {
    return <div className="zg-vote-trolls">VoteTrolls{props.trolls}</div>
}

export default VoteTrolls;