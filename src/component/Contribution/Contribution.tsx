import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import "./Contribution.scss";

const Contribution: React.FC = () => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-body">
      <h2>Make a contribution to the discussion ---- discussion name</h2>
      <p></p>
      <textarea className="zg-contribution-input" autoFocus/>
      <br/>
      <br/>
      <button className="zg-submit-contribution">Submit contribution</button>
      <br/>
      <br/>
      <button onClick={handleClose}>Cancel</button>
    </div>
  );

  return (
    <div className="zg-contribution">
      <button type="button" onClick={handleOpen}>
        Contribute
      </button>
      <Modal
        className="zg-contribution-modal"
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default Contribution;
