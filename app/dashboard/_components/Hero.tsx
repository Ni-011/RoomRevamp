"use client";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";

function Hero() {
  const user = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl text-[#3a5a40]">
          Hello {user?.user?.fullName}
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="p-8 rounded-full text-lg bg-[#3a5a40] text-white hover:bg-[#588157]">
            ReImagine your room
          </Button>
        </Link>
      </div>

      {userRoomList?.length == 0 ? <EmptyState /> : <div></div>}
    </div>
  );
}

export default Hero;
