import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";

import "./DeleteContribution.scss";
import axios from "axios";

interface DeleteProps {
  contributionId: number | null;
  points: number | null;
}

const DeleteContribution: React.FC<DeleteProps> = (props) => {
  const [open, setOpen] = useState(false);

  let contributionId = props.contributionId;

  let points = props.points;

  let deleteContribution = async () => {
    if (points != null) {
      await axios
        .delete(
          `https://fathomless-reaches-38159.herokuapp.com/api/removeVotesFromContribution/${contributionId}`
        )
        .then((res) => {
          console.log(res.status);
        });
    }

    await axios
      .delete(`https://fathomless-reaches-38159.herokuapp.com/api/deleteContribution/${contributionId}`)
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
      <button onClick={handleOpen} className="zg-delete-contribution">
        <DeleteOutlinedIcon style={{ height: "20px" }} />
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
