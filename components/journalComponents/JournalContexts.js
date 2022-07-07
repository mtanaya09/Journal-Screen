import React, { useContext, createContext, useState } from "react";
import { JournalFolder } from "./props";
const JournalsContext = createContext([JournalFolder]);
const JournalsUpdate = createContext([JournalFolder]);

export const useJournalContext = () => useContext(JournalsContext);
export const useJournalUpdate = () => useContext(JournalsUpdate);

const JournalContexts = ({ children }) => {
  //this will track the journals
  const [currentJournals, setJournals] = useState([JournalFolder]);
  return (
    <JournalsContext.Provider value={currentJournals}>
      <JournalsUpdate.Provider value={setJournals}>
        {children}
      </JournalsUpdate.Provider>
    </JournalsContext.Provider>
  );
};
export default JournalContexts;
