import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="p-10 flex items-center justify-center">
      <Image src="/room.png" alt="a nice room" width={600} height={300} />
    </div>
  );
}

export default EmptyState;
