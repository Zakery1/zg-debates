import React, { useState } from "react";

import "./Register.scss";

import { Modal } from "@material-ui/core";

const Register: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <form className="zg-register-modal-body">
        <h3 className="">Register</h3>
        <input placeholder="username" type="text" className="zg-register-form" />
        <input placeholder="password"  className="zg-register-form" />
        <input placeholder="re-enter password" type="password" className="zg-register-form" />
        <button className="zg-register-form" type="submit">
          Submit
        </button>
        <button
          className="zg-register-form"
          type="button"
          onClick={handleClose}
        >
          Cancel
        </button>
    </form>
  );

  return (
    <div>
      <button className="zg-register-button" type="button" onClick={handleOpen}>
        Register
      </button>

      <Modal className="zg-register-modal" open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default Register;
