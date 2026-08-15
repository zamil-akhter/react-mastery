import UserContext from "./userContext";
import React, { useState } from "react";

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("----user----", user);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
