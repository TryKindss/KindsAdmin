import React, { PropsWithChildren } from "react";

function MainPageWrapper({ children }: PropsWithChildren) {
  return <div className="flex h-full bg-gray-50">{children}</div>;
}

export default MainPageWrapper;
