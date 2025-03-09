import React from "react";

interface RoomDesign {
  id: number;
  roomType: string;
  Theme: string;
  userQuery: string;
  ogImageURL: string;
  transformedImageURL: string;
  userEMail: string | null;
}

import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const HeroRoomCard = ({ room }: { room: RoomDesign }) => {
  return (
    <div className="rounded-xl overflow-hidden h-full flex items-center justify-center bg-[#e9edc9]/20">
      <div className="w-full">
        <ReactBeforeSliderComponent
          firstImage={{
            imageUrl: room.ogImageURL,
          }}
          secondImage={{
            imageUrl: room.transformedImageURL,
          }}
        />
      </div>
    </div>
  );
};

export default HeroRoomCard;
