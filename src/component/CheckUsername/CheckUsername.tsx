import React from "react";

import "./CheckUsername.scss";

const CheckUsername: React.FC = () => {
  return (
    <div style={{color: "red"}} className="zg-register-form">
      Username Already Exists
    </div>
  );
};

export default CheckUsername;
