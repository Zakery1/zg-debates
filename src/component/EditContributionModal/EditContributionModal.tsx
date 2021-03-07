import React, { useState, useContext } from "react";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import "./EditContributionModal.scss";

import { Modal, Tooltip, Button } from "@material-ui/core";

interface EditContributionProps {
  contributionId: number | null;
  contributionCreator: number | null;
  contribution: string;
  discussionName: string;
}

const EditContributionModal: React.FC<EditContributionProps> = (props) => {
  let { contributionId } = props;

  let [contribution, setContribution] = useState(props.contribution);

  const [updatedContribution, setUpdatedContribution] = useState("");
  const [open, setOpen] = useState(false);

  let value = useContext(SimpleCtx);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const baseUrl =
    process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  let getEditedContribution = async () => {
    await axios
      .get(`${baseUrl}/api/contributions/?contributionId=${contributionId}`)
      .then((res) => {
        res.data.map((contribution: any) => {
          return setContribution(contribution.contribution);
        });
      });
  };

  let editContribution = async () => {
    await axios
      .put(`${baseUrl}/api/contributions/${contributionId}`, {
        updatedContribution: updatedContribution,
      })
      .then((res) => {
        console.log(res.status);
      });

    setUpdatedContribution("");
    handleClose();
    getEditedContribution();
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

  console.log("compare in edit", value?.id === props.contributionCreator);

  return (
    <div>
      {value?.id == props.contributionCreator ? (
        <Tooltip placement="top" title="Edit">
          <button
            className="zg-contribution-content zg-contribution-author"
            onClick={handleOpen}
          >
            {contribution}
          </button>
        </Tooltip>
      ) : (
        <button className="zg-contribution-content">{contribution}</button>
      )}
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
