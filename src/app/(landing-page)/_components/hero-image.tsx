"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

export const HeroImage = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/app.png" : "/app-light.png"}
      alt="Interview Archive App Screenshot"
      className="rounded-lg shadow-lg border-2"
      width={1800}
      height={1000}
    />
  );
};
