import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

function Logo({
  className,
  spanDesign,
}: {
  className?: "string";
  spanDesign?: string;
}) {
  return (
    <Link href={"/"}>
      <h2
        className={cn(
          "text-2xl text-white  font-black tracking-wide uppercase hover:text-red-600 hoverEffect group font-sans ",
          className,
        )}
      >
        Maryem
        <span
          className={cn(
            "text-red-600 group-hover:text-white hoverEffect",
            spanDesign,
          )}
        >
          {" "}
          Home
        </span>
      </h2>
    </Link>
  );
}

export default Logo;
