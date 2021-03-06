import React, { Dispatch, SetStateAction, useEffect, useCallback } from "react";

import axios from "axios";

import "./CheckUsername.scss";

interface CheckUsernameProps {
  username: string;
  validUsername: boolean;
  setValidUsername: Dispatch<SetStateAction<boolean>>;
}

const CheckUsername: React.FC<CheckUsernameProps> = (props) => {

  const baseUrl =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const checkUsername = useCallback(async () => {
    if (props.username) {
      await axios
        .get(
          `${baseUrl}/api/users/?username=${props.username}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            props.setValidUsername(false);
          } else {
            props.setValidUsername(true);
          }
        });
    }
  }, [props, baseUrl]);

  useEffect(() => {
    checkUsername();
  }, [checkUsername]);

  return (
    <span>
      {props.username.length < 1 || props.validUsername ? (
        ""
      ) : (
        <span style={{ color: "red" }} className="zg-register-form">
          <br />
          Username Already Exists
        </span>
      )}
    </span>
  );
};

export default CheckUsername;
