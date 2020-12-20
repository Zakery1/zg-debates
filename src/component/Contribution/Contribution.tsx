import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import "./Contribution.scss";

const Contribution: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-body">
      <h2>Make a contribution to the discussion ---- discussion name</h2>
      <div className="zg-choice-group">

        <button onClick={() => setChoice("agree")} className={"zg-choice-agree " + (choice === "agree" ? "zg-choice-selected" : "" )}>I agree</button>
        <button onClick={() => setChoice("neutral")} className={"zg-choice-neutral " + (choice === "neutral" ? "zg-choice-selected" : "" )}>I'm neutral</button>
        <button onClick={() => setChoice("disagree")} className={"zg-choice-disagree " + (choice === "disagree" ? "zg-choice-selected" : "" )}>I disagree</button>
      </div>

      <textarea className="zg-contribution-input" autoFocus />
      <br />
      <br />
      <button className="zg-submit-contribution">Submit contribution</button>
      <br />
      <br />
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
