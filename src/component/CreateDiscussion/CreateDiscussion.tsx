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
      <h2>Create discussion</h2>
      <p>Please create discussion related to topic -- topic name -- or a moderator will delete it.</p>
      <textarea
        className="zg-discussion-input"
        maxLength={200}
        autoFocus
        // onChange={(e) => setContribution(e.target.value)}
      />
      <br/>
      <button>Create Discussion!</button>
      <br/>
      <button onClick={handleClose}>Cancel</button>
    </div>
  );
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create Discussion
      </button>
      <Modal
        className="zg-create-discussion-modal"
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default CreateDiscussion;
