import React from "react";

function CenterLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center">{children}</div>;
}

export default CenterLayout;
