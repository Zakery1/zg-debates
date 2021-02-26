import React, { useState, createContext, useEffect } from "react";

type SetUserInfo = (value: any) => void;

interface UserContextInterface {
  username: any;
  setUsername: SetUserInfo;
  id: any;
  setId: SetUserInfo;
}

export const SimpleCtx = createContext<UserContextInterface | null>(null);

export const CtxProvider: React.FC = (props) => {
  const [username, setUsername] = useState();
  const [id, setId] = useState();
  console.log("props in context", props);
  console.log("username in context", username);
  console.log("id in context", id);
  console.log(localStorage.username);

  useEffect(() => {
    if (localStorage.username){ setUsername(localStorage.username);
    setId(localStorage.userId);
    }
  }, []);

  return (
    <SimpleCtx.Provider
      value={{
        username,
        setUsername,
        id,
        setId,
      }}
    >
      {props.children}
    </SimpleCtx.Provider>
  );
};
