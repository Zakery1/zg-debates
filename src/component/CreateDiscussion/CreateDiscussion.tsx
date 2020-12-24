import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import { useParams } from "react-router-dom";

import axios from "axios";

import "./CreateDiscussion.scss";

interface DiscussionData {
  creatorId: number;
  categoryId: number;
  discussionName: string;
}

interface TopicParams {
  categoryId: string;
}

const CreateDiscussion: React.FC<TopicParams> = (props) => {
  const [discussionName, setDiscussionName] = useState("");
  const [open, setOpen] = useState(false);
  let categoryId = props;

  const createDiscussion = () => {
    let postData: DiscussionData = {
      creatorId: 1,
      categoryId: +categoryId,
      discussionName: discussionName,
    };

    axios({
      method: "post",
      url: "http://localhost:8080/api/createDiscussion",
      data: postData,
    });
    setDiscussionName("");
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-create-discussion-body">
      <h2>Create discussion</h2>
      <p>
        Please create discussion related to topic -- topic name -- or a
        moderator will delete it.
      </p>
      <textarea
        onChange={(e) => setDiscussionName(e.target.value)}
        className="zg-discussion-input"
        maxLength={200}
        autoFocus
        // onChange={(e) => setContribution(e.target.value)}
      />
      <br />
      {discussionName ? (
        <button onClick={createDiscussion}>Create Discussion!</button>
      ) : (
        <button disabled>Create Discussion!</button>
      )}

      <br />
      <button onClick={handleClose}>Cancel</button>
    </div>
  );
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Create Discussion
      </button>
      <Modal
        className="zg-create-discussion-modal"
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
};

export default CreateDiscussion;
