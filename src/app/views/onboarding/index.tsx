import { useCreateAccountContext } from "@/providers/CreateAccountContext";
import React from "react";

function OnboardingView() {
  const { accountName } = useCreateAccountContext();

  return <div>OnboardingView - {accountName}</div>;
}

export default OnboardingView;
