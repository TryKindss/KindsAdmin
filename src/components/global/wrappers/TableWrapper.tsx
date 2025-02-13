import React, { PropsWithChildren } from "react";

function TableWrapper({ children }: PropsWithChildren) {
  return <div className="container mx-auto rounded-md ">{children}</div>;
}

export default TableWrapper;
