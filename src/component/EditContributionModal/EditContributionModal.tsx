import React, { useState } from "react";

import axios from "axios";

import "./EditContributionModal.scss";

import { useHistory } from "react-router-dom";

import Modal from "@material-ui/core/Modal";

interface ContributionId {
  contributionId: number | null;
}

interface Contribution {
  contribution: string;
}

const EditContributionModal: React.FC<ContributionId & Contribution> = (props) => {

  let history = useHistory();

  let { contributionId, contribution } = props;

  const [updatedContribution, setUpdatedContribution] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let editContribution = async () => {
    axios
      .put(`https://zg-debates.netlify.app/api/editContribution/${contributionId}`, {
        updatedContribution,
      })
      .then((res) => {
        console.log(res.status);
      });
    setUpdatedContribution("");
    handleClose();
    history.go(0);
  };

  const body = (
    <div className="zg-edit-contribute-body">
      <h2>Make a contribution to the discussion ---- discussion name</h2>

      <textarea
        className="zg-edit-contribution-input"
        maxLength={200}
        autoFocus
        // onChange={(e) => setContribution(e.target.value)}
        defaultValue={contribution}
        onChange={(e) => setUpdatedContribution(e.target.value)}
      />
      <br />
      <br />

      {updatedContribution ? (
        <button
          onClick={editContribution}
          type="submit"
          className="zg-submit-edit-contribution"
        >
          Submit Updated Contribution
        </button>
      ) : (
        <button className="zg-submit-edit-contribution" disabled>
          Submit Updated Contribution
        </button>
      )}

      <br />
      <br />
      <button onClick={handleClose}>Cancel</button>
    </div>
  );

  return (
    <div>
      <button onClick={handleOpen}>Edit</button>
      <Modal
        className="zg-edit-contribution-modal"
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default EditContributionModal;
