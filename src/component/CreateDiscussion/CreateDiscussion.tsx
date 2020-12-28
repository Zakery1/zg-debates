import React, { useState } from "react";

import Modal from "@material-ui/core/Modal";

import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";

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

  const createDiscussion = async () => {
    let postData: DiscussionData = {
      creatorId: 1,
      categoryId: +categoryId,
      discussionName: discussionName,
    };

    await axios
      .post(`http://localhost:8080/api/createDiscussion`, { data: postData })
      .then((res) => {
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
        <Button
          className="zg-create-discussion-button"
          onClick={createDiscussion}
        >
          Create Discussion!
        </Button>
      ) : (
        <Button style={{opacity:"20%"}} className="zg-create-discussion-button" disabled>
          Create Discussion!
        </Button>
      )}

      <br />
      <br />
      <Button className="zg-create-discussion-button" onClick={handleClose}>Cancel</Button>
    </div>
  );
  return (
    <div className="zg-create-discussion">
      <Button className="zg-open-discussion-modal" type="button" onClick={handleOpen}>
        Create Discussion
      </Button>
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
