import React, { Dispatch, SetStateAction, useEffect } from "react";

import axios from "axios";

import "./CheckUsername.scss";

interface CheckUsernameProps {
  username: string;
  validUsername: boolean;
  setValidUsername: Dispatch<SetStateAction<boolean>>;
}

const CheckUsername: React.FC<CheckUsernameProps> = (props) => {

  const checkUsername = async () => {
    if (props.username) {
      await axios
        .get(
          `http://localhost:3000/api/checkIfUsernameExists/${props.username}`
        )
        .then((res) => {
          if (res.data.length) {
            props.setValidUsername(true);
          } else {
            props.setValidUsername(false);
          }
        });
    }
  };

  useEffect(() => {
    checkUsername();
  }, [props.username]);

  return (
    <span>
      {props.username.length > 1 && props.validUsername ? (
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
