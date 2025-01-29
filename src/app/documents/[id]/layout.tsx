import React from "react";

function DocumentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="h-[100%] bg-white p-2">{ children}</div>
  );
}
export default DocumentLayout;
