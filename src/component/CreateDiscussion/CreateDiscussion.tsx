import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";

import axios from "axios";

import "./CreateDiscussion.scss";

const CreateDiscussion: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-create-discussion-body">
      <button onClick={handleClose}>Cancel</button>
    </div>
  );
  return (
    <div>
      <button
        type="button"
        className="zg-create-discussion"
        onClick={handleOpen}
      >
        Contribute
        <Modal
          className="zg-create-discussion-modal"
          open={open}
          onClose={handleClose}
        >
          {body}
        </Modal>
      </button>
    </div>
  );
};

export default CreateDiscussion;
