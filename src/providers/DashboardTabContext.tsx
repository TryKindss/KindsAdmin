"use  client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DashboardTabContextType {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

interface ContextProviderProps {
  children: ReactNode;
}
const DashboardTabContext = createContext<DashboardTabContextType | undefined>(
  undefined
);

export const DashboardTabProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [active, setActive] = useState("dashboard");

  const contextValue = React.useMemo(() => {
    return {
      active,
      setActive,
    };
  }, [active]);

  return (
    <DashboardTabContext.Provider value={contextValue}>
      {children}
    </DashboardTabContext.Provider>
  );
};

export const useDashboardTabContext = (): DashboardTabContextType => {
  const context = useContext(DashboardTabContext);
  if (!context) {
    throw new Error(
      "useDashboardTabContext must be used within an DashboardTy"
    );
  }
  return context;
};

