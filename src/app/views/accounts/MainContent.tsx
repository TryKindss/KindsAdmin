import React from "react";
import AccountsTable from "./AccountsTable";
import MainTableWrapper from "@/components/global/wrappers/MainTableWrapper";

function MainContent() {
  return (
    <MainTableWrapper>
      <AccountsTable />
    </MainTableWrapper>
  );
}

export default MainContent;
