import React, { useState, createContext, useEffect, useMemo } from "react";

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

  // const [profile, setProfile] = useState({ _id: '', photo: '', name: '', email:'', phonenumber:'', position:'', privilege:'', password:''});

  // const value = useMemo(() => ({
  //     profile, setProfile
  // }), [profile]);

  // const value


  // debugger;

  useEffect(() => {
    // debugger;
    if (localStorage.username) {
      setUsername(localStorage.username);
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
