import React, { useState, useEffect } from "react";

import axios from "axios";

interface Post {
  username: string;
}

const User: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get(`https://fathomless-reaches-38159.herokuapp.com/api/getUserById/1`)
        .then((res) => {
          const user = res.data;
          setUsername(user);
        });
    }
    fetchUser();
  }, [username]);

  return <div>{username}</div>;
};

export default User;
