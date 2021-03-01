import React, { useState, useContext } from "react";

import { SimpleCtx } from "../../context/UserContext";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import { useParams } from "react-router-dom";

import axios from "axios";

import "./CreateContribution.scss";

interface ContributionData {
  userId: number;
  discussionId: number;
  contribution: string;
  agree: boolean | null;
  neutral: boolean | null;
  disagree: boolean | null;
  points: number;
}

interface CreateContributionProps {
  fetchContributions: () => Promise<void>;
  discussionName: string;
}

interface DiscussionParams {
  discussionId: string;
}

const CreateContribution: React.FC<CreateContributionProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState("");
  const [contribution, setContribution] = useState("");

  const value = useContext(SimpleCtx);

  const { discussionId }: DiscussionParams = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitContribution = async () => {
    let postData: ContributionData = {
      userId: value?.id,
      discussionId: +discussionId,
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
      .post(`http://localhost:3000/api/contributions`, { data: postData })
      .then((res) => {
      });

    setContribution("");
    setChoice("");
    handleClose();
    props.fetchContributions();
  };

  const choiceButtons = ["agree", "neutral", "disagree"].map(
    (selectedChoice, index) => {
      return (
        <Button
          key={index}
          onClick={() => setChoice(selectedChoice)}
          className={
            `zg-choice-${selectedChoice} ` +
            (choice === selectedChoice ? "zg-choice-selected" : "")
          }
        >
          {selectedChoice}
        </Button>
      );
    }
  );

  const body = (
    <div className="zg-contribute-body">
      <h2>{props.discussionName}</h2>
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
        <Button
          onClick={submitContribution}
          type="submit"
          className="zg-submit-contribution"
        >
          Submit Contribution
        </Button>
      ) : (
        <Button className="zg-submit-contribution zg-disabled" disabled>
          Submit Contribution
        </Button>
      )}
      <br />

      <Button className="zg-cancel-contribution-modal" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <div className="zg-contribution">
      <Button
        className="zg-modal-contribute"
        type="button"
        onClick={handleOpen}
      >
        Contribute <AddCircleIcon className="zg-plus-icon" />
      </Button>
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

export default CreateContribution;
