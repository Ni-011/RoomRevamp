import { Textarea } from "@/components/ui/textarea";
import React from "react";

function UserQuery({
  userQueryInput,
}: {
  userQueryInput: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-lg text-[#3a5a40]">
        Enter Additional Details for your Design (optional):
      </label>
      <Textarea
        placeholder="Example: I want a cozy reading corner near the window..."
        className="mt-4 min-h-[120px] bg-[#fefae0] border-[#3a5a40] 
        text-[#3a5a40] placeholder:text-[#3a5a40]/50
        focus:ring-[#3a5a40] hover:bg-[#ccd5ae] transition-colors duration-200
        rounded-xl text-lg resize-none"
        onChange={(e) => userQueryInput(e.target.value)}
      />
    </div>
  );
}

export default UserQuery;
