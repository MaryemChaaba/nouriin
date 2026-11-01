import { logo } from "../../assets/image";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({
  className,
  logoUrl,
}: {
  className?: string;
  logoUrl?: string | null;
}) => {
  return (
    <Link href={"/"}>
      <Image
        src={logoUrl || logo}
        alt="logo"
        className={cn("w-24", className)}
        width={96}
        height={30}
        style={{ width: "auto", height: "auto" }}
        priority
      />
    </Link>
  );
};

export default Logo;
