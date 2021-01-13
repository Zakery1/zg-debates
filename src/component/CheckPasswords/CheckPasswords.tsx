import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import "./CheckPasswords.scss";

interface SetPasswordProps {
  passwordOne: string;
  passwordTwo: string;
  setPasswordOne: Dispatch<SetStateAction<string>>;
  setPasswordTwo: Dispatch<SetStateAction<string>>;
  validPassword: boolean;
  setValidPassword: Dispatch<SetStateAction<boolean>>;
}

const CheckPasswords: React.FC<SetPasswordProps> = (props) => {
  const [passwordNote, setPasswordNote] = useState("");

  const setPassword = (inputNumber: number, password: string) => {
    if (inputNumber === 1) {
      props.setPasswordOne(password);
    } else {
      props.setPasswordTwo(password);
    }
  };

  const runValidation = () => {
    if (props.passwordOne !== props.passwordTwo) {
      props.setValidPassword(false);
      setPasswordNote("passwords dont match");
    } else if (props.passwordOne.length < 7) {
      props.setValidPassword(false);
      setPasswordNote("password too short");
    } else {
      setPasswordNote("");
      props.setValidPassword(true);
    }
  };

  useEffect(() => {
    runValidation();
  }, [props.passwordOne, props.passwordTwo]);

  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <input
        placeholder="password"
        type="password"
        className="zg-register-form"
        onChange={(e) => setPassword(1, e.target.value)}
      />
      <input
        placeholder="re-enter password"
        type="password"
        className="zg-register-form"
        onChange={(e) => setPassword(2, e.target.value)}
      />
      {!props.validPassword && props.passwordOne.length > 0 ? passwordNote : "good"}
    </span>
  );
};

export default CheckPasswords;
