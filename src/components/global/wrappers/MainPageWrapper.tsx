import React, { PropsWithChildren } from "react";

function MainPageWrapper({ children }: PropsWithChildren) {
  return <div className="flex h-full bg-gray-50 gap-4 pb-8">{children}</div>;
}

export default MainPageWrapper;
