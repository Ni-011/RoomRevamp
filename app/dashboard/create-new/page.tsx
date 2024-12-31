"use client";
import React from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomtType from "./_components/RoomtType";

function createNew() {
  const handleImageChange = (value: any, field: string) => {};
  return (
    <div>
      <h1 className="text-4xl text-center text-[#3a5a40]">
        ReImagine your Room with 1 click
      </h1>
      <div className="flex flex-row items-center justify-center mt-10">
        {/* image upload */}
        <ImageSelection
          SelectedImage={(value: any) => handleImageChange(value, "image")}
        />
        {/* form */}
        <div>
          {/* room type */}
          <RoomtType />
          {/* design type */}

          {/* additonal req */}

          {/* generate button */}
        </div>
      </div>
    </div>
  );
}

export default createNew;
