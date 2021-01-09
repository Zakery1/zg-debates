import React, { useState } from "react";

import axios from "axios";

import "./EditContributionModal.scss";

import { Modal, Tooltip, IconButton, Button } from "@material-ui/core";

interface EditContributionProps {
  contributionId: number | null;
  contribution: string;
  discussionName: string;
}

const EditContributionModal: React.FC<EditContributionProps> = (props) => {
  let { contributionId } = props;

  let [contribution, setContribution] = useState(props.contribution);

  const [updatedContribution, setUpdatedContribution] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let getSingleContribution = async () => {
    await axios
      .get(`http://localhost:3000/api/getSingleContribution/${contributionId}`)
      .then((res) => {
        setContribution(res.data);
      });
  };

  let editContribution = async () => {
    await axios
      .put(`http://localhost:3000/api/editContribution/${contributionId}`, {
        updatedContribution: updatedContribution,
      })
      .then((res) => {
        console.log(res.status);
      });

    setUpdatedContribution("");
    handleClose();
    getSingleContribution();
  };

  const body = (
    <div className="zg-edit-contribute-body">
      <h2>{props.discussionName}</h2>

      <textarea
        className="zg-edit-contribution-input"
        maxLength={200}
        autoFocus
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
      <Button className="zg-cancel-edit" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <Tooltip placement="top" title="Edit">
        <button className="zg-contribution-content" onClick={handleOpen}>
          {contribution}
        </button>
      </Tooltip>

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
