"use client";
import { userDetailsAtom } from "@/app/atoms/UserDetailsAtom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { db } from "@/config/db";
import { RoomDesigns } from "@/config/schema";
import { desc, eq } from "drizzle-orm";
import HeroRoomCard from "./HeroRoomCard";

interface RoomDesign {
  id: number;
  roomType: string;
  Theme: string;
  userQuery: string;
  ogImageURL: string;
  transformedImageURL: string;
  userEMail: string | null;
}

function Hero() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState<RoomDesign[]>([]);

  useEffect(() => {
    user && getUserRooms();
  }, [user]);

  const getUserRooms = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    const result = await db
      .select()
      .from(RoomDesigns)
      .where(
        eq(RoomDesigns.userEMail, user?.primaryEmailAddress?.emailAddress)
      );
    setUserRoomList(result);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="text-5xl text-[#3a5a40] mb-3 sm:mb-0 text-center">
          Hello {user?.fullName}
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="px-12 cursor-pointer py-8 rounded-full text-xl bg-[#3a5a40] text-white hover:bg-[#588157]">
            ReImagine your room
          </Button>
        </Link>
      </div>

      {userRoomList?.length == 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 auto-rows-fr">
            {userRoomList.map((room: RoomDesign, index: number) => {
              return <HeroRoomCard key={index} room={room} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
