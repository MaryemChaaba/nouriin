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
          "text-2xl text-green-950  font-black tracking-wide uppercase hover:text-red-600 hoverEffect group font-sans ",
          className,
        )}
      >
        Chopcar
        <span
          className={cn(
            "text-red-600 group-hover:text-green-950 hoverEffect",
            spanDesign,
          )}
        >
          t
        </span>
      </h2>
    </Link>
  );
}

export default Logo;
