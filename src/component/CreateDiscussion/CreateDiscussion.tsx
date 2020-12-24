import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import { useHistory } from "react-router-dom";

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
  let { categoryId } = props;
  let history = useHistory();

  const createDiscussion = () => {
    let postData: DiscussionData = {
      creatorId: 1,
      categoryId: +categoryId,
      discussionName: discussionName,
    };

    axios({
      method: "post",
      url: "https://zg-debates.netlify.app/api/createDiscussion",
      data: postData,
    }).then((res) => {
      console.log(res.status);
    });
    setDiscussionName("");
    handleClose();
    history.go(0);
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
      />
      <br />
      {discussionName ? (
        <button onClick={createDiscussion}>Create Discussion!</button>
      ) : (
        <button disabled>Create Discussion!</button>
      )}

      <br />
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
