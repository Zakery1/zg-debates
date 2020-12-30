import React, { useState } from "react";

import EditIcon from '@material-ui/icons/Edit';

import axios from "axios";

import "./EditContributionModal.scss";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

interface ContributionId {
  contributionId: number | null;
}

interface Contribution {
  contribution: string;
}

const EditContributionModal: React.FC<ContributionId & Contribution> = (
  props
) => {
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
    await axios
      .put(
        `http://localhost:3000/api/editContribution/${contributionId}`,
        { updatedContribution: updatedContribution }
      )
      .then((res) => {
        console.log(res.status);
      });

    setUpdatedContribution("");
    handleClose();
    window.location.reload();
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

      {updatedContribution.length ? (
        <Button
          onClick={editContribution}
          type="submit"
          className="zg-submit-edit-contribution"
        >
          Submit Updated Contribution
        </Button>
      ) : (
        <Button className="zg-submit-edit-contribution zg-disabled" disabled>
          Submit Updated Contribution
        </Button>
      )}

      <br />
      <br />
      <Button className="zg-cancel-edit"  onClick={handleClose}>Cancel</Button>
    </div>
  );

  return (
    <div>
      <button className="zg-edit-contribution-icon" onClick={handleOpen}><EditIcon/></button>
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
