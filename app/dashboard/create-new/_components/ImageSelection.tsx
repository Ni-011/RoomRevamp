"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelection({ SelectedImage }: any) {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (event: any) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    SelectedImage(event.target.files[0]);
  };

  return (
    <div>
      <label className="text-xl text-[#3a5a40]">
        Upload an Image of your room
      </label>
      <div className="mt-3">
        <label htmlFor="image-upload">
          <div
            className={`cursor-pointer border rounded-xl border-dotted border-[#3a5a40] 
            bg-[#e9edc9] hover:bg-[#ccd5ae] transition-colors duration-200 
            flex justify-center items-center
            ${file ? "w-[400px] h-[400px] p-0" : "w-[400px] h-[400px] p-0"}`}
          >
            {!file ? (
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src="/upload-file.png"
                  alt="upload-file"
                  width={100}
                  height={100}
                  className="opacity-70"
                />
              </div>
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                alt="uploaded File"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="image-upload"
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
