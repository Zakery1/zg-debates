import React, { useState } from "react";

import "./Register.scss";

import { Modal, Button } from "@material-ui/core";

const Register: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string | undefined>();
  const [passwordTwo, setPasswordTwo] = useState<string>();
  const [passwordNote, setPasswordNote] = useState<string>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //check if username is unqique

  const checkPasswordsMatch = () => {
    if (password && password.length < 7) {
      return setPasswordNote("password too short");
    } else if (password !== passwordTwo) {
      return setPasswordNote("passwords don't match");
    } else {
      return true;
    }
  };

  const sumbitRegistration = () => {
    if (checkPasswordsMatch()) {
      console.log("password good");
    }
  };

  const body = (
    <form className="zg-register-modal-body">
      <h1 className="">Register</h1>
      <input placeholder="username" type="text" className="zg-register-form" />
      <input
        placeholder="password"
        type="password"
        className="zg-register-form"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="re-enter password"
        type="password"
        className="zg-register-form"
        onChange={(e) => setPasswordTwo(e.target.value)}
      />
      <Button
        onClick={sumbitRegistration}
        className="zg-register-form form-button"
      >
        Submit
      </Button>
      {passwordNote ? (
        <span className="zg-password-invalid">{passwordNote}</span>
      ) : (
        ""
      )}

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
