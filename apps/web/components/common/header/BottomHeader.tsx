"use client";
import Container from "../Container";
import Image from "next/image";
import { dots } from "@/assets/image";
import { bottomHeaderNavList } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { useState, useRef, useEffect } from "react";
import { Category } from "@entry/types";
import CategorySidebar from "../CategorySidebar";
import { ChevronDown } from "lucide-react";
import PremiumButton from "./PremiumButton";

interface BottomHeaderProps {
  config?: {
    enabled?: boolean;
    categoryMenu?: boolean;
    navList?: boolean;
  };
  categories?: Category[];
}

const BottomHeader = ({ config, categories }: BottomHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [childrenCategory, setChildrenCategory] = useState<Category[]>([]);
  const [parentCategory, setParentCategory] = useState<Category[]>([]);

  const getChildCategories = (parentId: string) => {
    return categories?.filter((cat) => cat?.parent?._id === parentId);
  };
  useEffect(() => {
    const p = categories?.filter(
      (cat) => cat.isActive && cat.level == 0 && cat.parent == null,
    );
    setParentCategory(p || []);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If no config or enabled is false, don't render anything
  if (config?.enabled === false) return null;

  const pathname = usePathname();

  return (
    <div>
      <Container className="flex items-center gap-5 relative justify-center">
        {/* Category Menu Toggle */}
        {(config?.categoryMenu ?? true) && (
          <div
            ref={containerRef}
            className="relative md:hidden"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-primary-foreground p-5 w-72 h-12 flex items-center justify-start gap-4 rounded-tl-lg rounded-tr-lg"
            >
              <Image src={dots} alt="dots" width={20} height={20} />
              <p className="text-black font-semibold text-base">
                All Categories
              </p>
            </button>
            {isOpen && (
              <div
                className={cn(
                  "absolute top-full left-0 z-50 w-full animate-in fade-in zoom-in-95 duration-200",
                  pathname === "/" && "lg:hidden",
                )}
              >
                <CategorySidebar
                  categories={categories || []}
                  className="rounded-tl-none rounded-tr-none shadow-xl border-t-0"
                />
              </div>
            )}
          </div>
        )}

        {/* Navigation List */}
        {(config?.navList ?? true) && (
          <div className="hidden md:inline-flex items-center gap-4 lg:gap-8">
            {parentCategory?.map((item) =>
              item?.childrenCount! > 0 ? (
                <PremiumButton
                  key={item?.name}
                  childrenCat={
                    categories?.filter((cat) => cat.parent?._id === item._id) ||
                    []
                  }
                  name={item?.name}
                />
              ) : (
                <Link href="item?.href" key={item?.name}>
                  <p
                    className={cn(
                      "text-sm lg:text-base font-semibold text-primary-foreground/90 hover:text-accent hoverEffect",
                      pathname === item?.name && "text-accent",
                    )}
                  >
                    {item?.name}
                  </p>
                </Link>
              ),
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default BottomHeader;
