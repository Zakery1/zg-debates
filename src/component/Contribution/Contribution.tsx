import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";

import { useParams } from "react-router-dom";

import axios from "axios";

import "./Contribution.scss";

interface Contribution {
  userId: number;
  discussionId: number;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number;
}

interface discussionParams {
  id: string;
}

const Contribution: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  const [contribution, setContribution] = useState("");

  const { id }: discussionParams = useParams();

  useEffect(() => {});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitContribution = () => {
    let postData: Contribution = {
      userId: 1,
      discussionId: +id,
      contribution: contribution,
      agree: null,
      neutral: null,
      disagree: null,
      points: 0,
    };

    if (choice === "agree") {
      postData.agree = true;
    } else if (choice === "neutral") {
      postData.neutral = true;
    } else {
      postData.disagree = true;
    }

    axios({
      method: "post",
      url: "http://localhost:8080/api/postContribution",
      data: postData,
    });
    setContribution("");
    handleClose();
  };

  const choiceButtons = ["agree", "neutral", "disagree"].map(
    (selectedChoice, index) => {
      return (
        <button
          key={index}
          onClick={() => setChoice(selectedChoice)}
          className={
            `zg-choice-${selectedChoice} ` +
            (choice === selectedChoice ? "zg-choice-selected" : "")
          }
        >
          {selectedChoice}
        </button>
      );
    }
  );

  const body = (
    <div className="zg-body">
      <h2>Make a contribution to the discussion ---- discussion name</h2>
      <div className="zg-choice-group">{choiceButtons}</div>

      <textarea
        className="zg-contribution-input"
        maxLength={200}
        autoFocus
        onChange={(e) => setContribution(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={submitContribution}
        type="submit"
        className="zg-submit-contribution"
      >
        Submit contribution
      </button>
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
