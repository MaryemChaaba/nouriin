"use client";
import { cn } from "@/lib/utils";
import { Category } from "@entry/types";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const PremiumButton = ({
  childrenCat,
  name,
}: {
  childrenCat?: Category[];
  name: string;
}) => {
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const premiumRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        premiumRef.current &&
        !premiumRef.current.contains(event.target as Node)
      ) {
        setIsPremiumOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      {/* Premium Pages Dropdown */}
      <div
        className="relative z-50 py-2"
        ref={premiumRef}
        onMouseEnter={() => setIsPremiumOpen(true)}
        onMouseLeave={() => setIsPremiumOpen(false)}
      >
        <button
          className={cn(
            "flex items-center gap-1 text-sm lg:text-base font-semibold text-primary-foreground/90 hover:text-accent hoverEffect",
            isPremiumOpen && "text-accent",
          )}
        >
          {name}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              isPremiumOpen && "rotate-180",
            )}
          />
        </button>
        {childrenCat && (
          <div
            className={cn(
              "absolute top-[calc(100%-8px)] right-0 mt-2 w-56 rounded-xl border border-border bg-background shadow-2xl overflow-hidden transition-all duration-200 origin-top-right",
              isPremiumOpen
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
            )}
          >
            <div className="p-2 space-y-1">
              {childrenCat?.map((cat) => (
                <Link
                  key={cat._id}
                  href="/seller"
                  className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-accent hover:text-white transition-colors text-foreground"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumButton;
