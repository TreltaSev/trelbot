import { createContext, useContext } from "react";
import me from "@lib/types/me";

export const MeContext = createContext<me | undefined>(undefined);

export const useMe = () => {
  const context = useContext(MeContext);
  if (context === undefined) {
    throw new Error("useMe must be used within a MeProvider");
  }
  return context;
};
