import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";

import "./CheckUsername.scss";

interface CheckUsernameProps {
  username: string;
}

const CheckUsername: React.FC<CheckUsernameProps> = (props) => {
  const [validUsername, setValidUsername] = useState<boolean>(true);

  const checkUsername = async () => {
    if (props.username) {
      await axios
        .get(
          `http://localhost:3000/api/checkIfUsernameExists/${props.username}`
        )
        .then((res) => {
          if (res.data.length) {
            setValidUsername(true);
          } else {
            setValidUsername(false);
          }
        });
    }
  };

  useEffect(() => {
    checkUsername();
  }, [props.username]);

  return (
    <span>
      {props.username.length > 1 && validUsername ? (
        <span style={{ color: "red" }} className="zg-register-form">
          <br />
          Username Already Exists
        </span>
      ) : (
        ""
      )}
    </span>
  );
};

export default CheckUsername;
