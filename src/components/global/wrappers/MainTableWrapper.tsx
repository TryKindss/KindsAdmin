import React, { PropsWithChildren } from "react";

function MainTableWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="px-6">{children}</div>
    </div>
  );
}

export default MainTableWrapper;
