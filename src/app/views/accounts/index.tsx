import React from "react";
import MainContent from "./MainContent";
import MainPageWrapper from "@/components/global/wrappers/MainPageWrapper";
import AccountFilter from "./AccountFilter";

function AccountsView() {
  return (
    <MainPageWrapper>
      <AccountFilter />
      <MainContent />
    </MainPageWrapper>
  );
}

export default AccountsView;
