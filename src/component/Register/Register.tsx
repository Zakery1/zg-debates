import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import "./Register.scss";

import CheckUsername from "../CheckUsername/CheckUsername";
import CheckPasswords from "../CheckPasswords/CheckPasswords";

import { Modal, Button } from "@material-ui/core";

interface RegistrationData {
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validUsername, setValidUsername] = useState<boolean>(false);
  const [validRegistration, setValidRegistration] = useState<boolean>(false);

  const sumbitRegistration = async () => {
    let registrationData: RegistrationData = {
      username: username,
      password: passwordOne,
    };
    await axios
      .post("https://zg-debates.netlify.app/api/registerUser", { data: registrationData })
      .then((res) => {
        console.log(res.data);
      });
    handleClose();
  };

  const checkRegistration = useCallback(() => {
    if (validPassword && validUsername) {
      setValidRegistration(true);
    }
  }, [validPassword, validUsername]);

  useEffect(() => {
    checkRegistration();
    console.log("watch it")
  }, [checkRegistration]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <form className="zg-register-modal-body">
      <h1 className="">Register</h1>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        type="text"
        className="zg-register-form"
      />

      <CheckUsername
        username={username}
        validUsername={validUsername}
        setValidUsername={setValidUsername}
      />
      <CheckPasswords
        passwordOne={passwordOne}
        passwordTwo={passwordTwo}
        setPasswordOne={setPasswordOne}
        setPasswordTwo={setPasswordTwo}
        setValidPassword={setValidPassword}
        validPassword={validPassword}
      />

      <Button
        onClick={sumbitRegistration}
        className="zg-register-form form-button"
        disabled={!validRegistration}
      >
        Submit
      </Button>

      <Button
        className="zg-register-form form-button"
        type="button"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </form>
  );

  return (
    <div>
      <button className="zg-register-button" type="button" onClick={handleOpen}>
        Register
      </button>

      <Modal className="zg-register-modal" open={open}>
        {body}
      </Modal>
    </div>
  );
};

export default Register;
