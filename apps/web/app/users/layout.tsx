import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="scroll-smooth">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
