"use client";
import { useEffect, useState } from "react";
import {useThemeStore} from "../store";

const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme);
  const themeToggle = useThemeStore((state) => state.themeToggle);
  
  // useEffect(() => {
  //   if (theme) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);

  return (
    <button
      onClick={themeToggle}
      className={`w-[60px] h-[30px] rounded-full ${theme ? "bg-[#4B6BFB]" : "bg-gray-300"} relative transition-colors duration-300`}
    >
      <div
        className={`w-[24px] h-[24px] rounded-full bg-white absolute top-[3px] transition-all duration-300 ${
          theme ? "left-[32px]" : "left-[3px]"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
