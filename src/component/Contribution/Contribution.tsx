import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import "./Contribution.scss";

interface ContributionData {
  userId: number;
  discussionId: number;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number;
}

interface DiscussionParams {
  id: string;
}

const Contribution: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  const [contribution, setContribution] = useState("");

  let history = useHistory();

  const { id }: DiscussionParams = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitContribution = async () => {
    let postData: ContributionData = {
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

    await axios
      .post(
        `https://fathomless-reaches-38159.herokuapp.com/api/postContribution`,
        { data: postData }
      )
      .then((res) => {
        console.log(res.status);
      });

    setContribution("");
    handleClose();
    history.go(0);
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
    <div className="zg-contribute-body">
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

      {choice && contribution ? (
        <button
          onClick={submitContribution}
          type="submit"
          className="zg-submit-contribution"
        >
          Submit Contribution
        </button>
      ) : (
        <button className="zg-submit-contribution" disabled>
          Submit Contribution
        </button>
      )}

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
