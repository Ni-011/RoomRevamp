import Image from "next/image";
import React, { useState } from "react";

function Theme({
  selectedThemeType,
}: {
  selectedThemeType: (theme: string) => void;
}) {
  const Themes = [
    {
      name: "Modern",
      image: "/modern.png",
    },
    {
      name: "Minimalist",
      image: "/minimal.jpg",
    },
    {
      name: "Vintage",
      image: "/vintage.jpg",
    },
    {
      name: "Tropical",
      image: "/tropical.jpg",
    },
    {
      name: "Industrial",
      image: "/industrial.jpg",
    },
    {
      name: "Traditional",
      image: "/traditional.jpg",
    },
    {
      name: "Feminine",
      image: "/feminine.jpg",
    },
    {
      name: "Professional",
      image: "/professional.jpg",
    },
    {
      name: "Coastal",
      image: "/coastal.png",
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  return (
    <div className="w-full">
      <label className="text-lg text-[#3a5a40]">Select a theme you like:</label>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {Themes.map((theme, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedTheme(theme.name);
              selectedThemeType(theme.name);
            }}
            className={`bg-[#fefae0] p-2 rounded-lg cursor-pointer hover:bg-[#ccd5ae] transition-colors duration-200
            ${
              selectedTheme === theme.name
                ? "border-2 border-[#3a5a40] m-1"
                : ""
            }`}
          >
            <Image
              src={theme.image}
              alt={theme.name}
              width={200}
              height={200}
              className="w-full aspect-square object-cover rounded-xl"
            />
            <p className="text-[#3a5a40] text-center mt-4 text-xl">
              {theme.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Theme;
