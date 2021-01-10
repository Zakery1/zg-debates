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

  const body = <button className="zg-register-modal-body" type="button" onClick={handleClose}>hey</button>;

  return (
    <div>
      <button type="button" className="zg-register-button" onClick={handleOpen}>
        Register
      </button>
      <Modal className="zg-register-modal" open={open} onClick={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default Register;
