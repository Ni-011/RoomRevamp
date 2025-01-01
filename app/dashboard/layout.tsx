import React from "react";
import Header from "./_components/Header";
import Provider from "@/Provider";

function laout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#e9edc9] min-h-screen">
      <Header />
      <div className="pt-20 px-10 pb-10 md:px-10 lg:px-20 xl:px-20">
        {children}
      </div>
    </div>
  );
}

export default laout;
