import { createContext, useContext, useState } from "react";

// 1. Create context
const SharedStateContext = createContext();

// 2. Custom hook to use context
export const useSharedState = () => useContext(SharedStateContext);

// 3. Provider component
export const SharedStateProvider = ({ children }) => {
  const [dropdown, setdropdown] = useState("initial value");

  return (
    <SharedStateContext.Provider value={{ dropdown, setdropdown }}>
      {children}
    </SharedStateContext.Provider>
  );
};