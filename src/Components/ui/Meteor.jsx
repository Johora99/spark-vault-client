import React from "react";
import { cn } from "@/utils/cn";

export const Meteors = ({ number, className }) => {
  const meteors = new Array(number || 50).fill(true); // Increase the number for a denser rain effect

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"rain" + idx}
          className={cn(
            "animate-rain-effect absolute h-1 w-1 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
          style={{
            left: Math.random() * 100 + "vw", // Random horizontal position
            top: Math.random() * -200 + "px", // Start slightly above the viewport
            animationDelay: Math.random() * 2 + "s", // Random delay
            animationDuration: Math.random() * 2 + 2 + "s", // Random duration (2s to 4s)
          }}
        ></span>
      ))}
    </>
  );
};
