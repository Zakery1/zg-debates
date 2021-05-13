import React, { useState } from "react";

import axios from "axios";

import DeleteIcon from "@material-ui/icons/DeleteOutlined";

import { Modal, Tooltip, IconButton, Button } from "@material-ui/core";

import "./DeleteContribution.scss";

interface DeleteProps {
  contributionId: number | null;
  points: number | null;
  hyperboles: number | null;
  trolls: number | null;
}

const DeleteContribution: React.FC<DeleteProps> = (props) => {
  const [open, setOpen] = useState(false);

  let contributionId = props.contributionId;

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  let checkForVotes = () => {
    if (props.points || props.hyperboles || props.trolls) {
      return true;
    }
    return false;
  };

  let deleteContribution = async () => {
    if (checkForVotes()) {
      await axios
        .delete(`${baseUrl}/api/votes/${contributionId}`)
        .then((res) => {
          console.log(res.status);
        });
    }

    await axios
      .delete(`${baseUrl}/api/contributions/${contributionId}`)
      .then((res) => {
        console.log(res.status);
        window.location.reload();
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
      <Tooltip onClick={handleOpen} title="Delete">
        <IconButton
          style={{ height: "30px", width: "30px" }}
          aria-label="delete"
        >
          <DeleteIcon style={{ height: "17px" }} />
        </IconButton>
      </Tooltip>

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
