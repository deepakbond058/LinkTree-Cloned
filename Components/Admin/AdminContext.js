"use client";

import { createContext, useState } from "react";

// Create the context
export const AdminContext = createContext();

// Create a provider component
export function AdminProvider({ children }) {
  const [linkArr, setLinkArr] = useState(null);
  const [userBiodata, setUserBiodata] = useState(null);
  const [userBiosaved, setUserBiosaved] = useState(false);
  //this will keep track whenever user hits save on biomodal value is not important only the change should happen

  return (
    <AdminContext.Provider value={{ linkArr, setLinkArr, userBiodata,setUserBiodata, userBiosaved,setUserBiosaved }}>
      {children}
    </AdminContext.Provider>
  );
}
