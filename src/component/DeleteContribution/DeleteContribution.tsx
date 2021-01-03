import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";

import "./DeleteContribution.scss";
import axios from "axios";

interface ContributionId {
  contributionId: number | null;
}

const DeleteContribution: React.FC<ContributionId> = (
  props
) => {
  const [open, setOpen] = useState(false);

  let contributionId = props.contributionId;

  // if props.contributionPoints >1, delete all votes associated with contribution from votes table

  let deleteContribution = async () => {
    await axios
      .delete(`http://localhost:3000/api/deleteContribution/${contributionId}`)
      .then((res) => {
        console.log(res.status);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-delete-contribute-body">
      <h2>Confirm Delete</h2>

      <div className="zg-delete-modal-buttons">
        <Button
          type="submit"
          onClick={() => deleteContribution()}
          className="zg-submit-delete-contribution"
        >
          Delete
        </Button>
        <Button className="zg-cancel-delete" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <button onClick={handleOpen} className="zg-delete-contribution">
        <DeleteOutlinedIcon style={{height: "20px"}} />
      </button>
      <Modal
        className="zg-delete-contribution-modal"
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default DeleteContribution;
