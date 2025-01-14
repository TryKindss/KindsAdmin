"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface AccountCreateContextType {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  accountName: string;
  setAccountName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  showCreateAccountModal: boolean;
  setShowCreateAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  showRefineSync: boolean;
  setShowRefineSync: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with default undefined value
const AccountCreateContext = createContext<
  AccountCreateContextType | undefined
>(undefined);

// Props type for the context provider
interface ContextProviderProps {
  children: ReactNode;
}

// Context Provider component
export const AccountCreateProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(0);
  const [accountName, setAccountName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState<boolean>(false);
  const [showRefineSync, setShowRefineSync] = useState<boolean>(false);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
    return {
      step,
      setStep,
      accountName,
      setAccountName,
      email,
      setEmail,
      showCreateAccountModal,
      setShowCreateAccountModal,
      showRefineSync,
      setShowRefineSync,
    };
  }, [step, accountName, email, showCreateAccountModal]);

  return (
    <AccountCreateContext.Provider value={contextValue}>
      {children}
    </AccountCreateContext.Provider>
  );
};

export const useCreateAccountContext = (): AccountCreateContextType => {
  const context = useContext(AccountCreateContext);
  if (!context) {
    throw new Error(
      "useCreateAccountContext must be used within an AccountCreateProvider"
    );
  }
  return context;
};
