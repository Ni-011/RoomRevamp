"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomtType from "./_components/RoomtType";
import Theme from "./_components/Theme";
import UserQuery from "./_components/UserQuery";
import { Button } from "@/components/ui/button";

function createNew() {
  const [formData, setFormData] = useState([]);
  const handleInputChange = (value: any, field: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: [value],
    }));
  };

  return (
    <div className="max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
      <h1 className="text-4xl text-center text-[#3a5a40] mb-10">
        ReImagine your Room with 1 click
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side - image upload */}
        <div className="flex justify-center items-center lg:block">
          <ImageSelection
            SelectedImage={(value: any) => handleInputChange(value, "image")}
          />
        </div>

        {/* Right side - form */}
        <div className="flex flex-col gap-7">
          <RoomtType
            selectedRoomType={(value: string) =>
              handleInputChange(value, "RoomType")
            }
          />
          <Theme
            selectedThemeType={(theme: string) =>
              handleInputChange(theme, "theme")
            }
          />
          <UserQuery
            userQueryInput={(value: string) =>
              handleInputChange(value, "userQuery")
            }
          />
          {/* Generate button */}
          <Button
            className="w-full py-6 text-lg font-semibold bg-[#3a5a40] hover:bg-[#588157] 
            text-[#fefae0] transition-all duration-200 ease-in-out rounded-xl
            shadow-[0_6px_0px_0px_#344e3a] hover:shadow-[0_4px_0px_0px_#4e7350]
            hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none
            border-2 border-[#344e3a] hover:border-[#4e7350]
            transform hover:scale-[0.99] active:scale-[0.97] mt-[-15]"
          >
            Generate Design
          </Button>
          <p className="mt-[-20] font-italic text-[#3a5a40] text-md">
            Cost: Each generation consumes 2 credits*
          </p>
        </div>
      </div>
    </div>
  );
}

export default createNew;
