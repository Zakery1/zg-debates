import React, { useState, useContext } from "react";

import Modal from "@material-ui/core/Modal";

import axios from "axios";

import { SimpleCtx } from "../../context/UserContext";

import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import "./CreateDiscussion.scss";

interface FetchDiscussions {
  fetchDiscussions: () => Promise<void>;
}

interface DiscussionData {
  creatorId: number | null;
  categoryId: number | null;
  discussionName: string;
  date: string;
}

interface TopicParams {
  categoryId: number | null;
  categoryName: string | null;
}

const CreateDiscussion: React.FC<TopicParams & FetchDiscussions> = (props) => {
  const [discussionName, setDiscussionName] = useState("");
  const [open, setOpen] = useState(false);
  let { categoryId } = props;

  const value = useContext(SimpleCtx);

  const date = new Date();

  const baseUrl =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_LOCAL_SERVER;

  const createDiscussion = async () => {
    let postData: DiscussionData = {
      creatorId: value?.id,
      categoryId: categoryId,
      discussionName: discussionName,
      date: date.toDateString()
    };

    await axios
      .post(`${baseUrl}/api/discussions`, { data: postData })
      .then((res) => {
        console.log(res.status);
      });

    setDiscussionName("");
    handleClose();
    props.fetchDiscussions();
  };
  
  const handleOpen = () => {
    if (value?.username) {
      return setOpen(true);
    }
    return alert("You must be logged in to create a discussion.");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className="zg-create-discussion-body">
      <h2>Create discussion</h2>
      <p>
        Please create discussion related to <span style={{fontWeight: "bolder"}}>{props.categoryName}</span> or a
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
        <Button style={{opacity:".5"}} className="zg-create-discussion-button" disabled>
          Create Discussion!
        </Button>
      )}

      <br />
      <br />
      <Button className="zg-cancel-discussion-button" onClick={handleClose}>Cancel</Button>
    </div>
  );
  return (
    <div className="zg-create-discussion">
      <Button className="zg-open-discussion-modal" type="button" onClick={handleOpen}>
        Create Discussion
        <AddCircleIcon className="zg-add-icon"/>
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
