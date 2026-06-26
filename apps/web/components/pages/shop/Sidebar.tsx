"use client";
import { cn } from "@/lib/utils";
// import { canAccessMenuItem } from "@/lib/rolePermissions";
// import useAuthStore from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Tag,
  Bookmark,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layers,
  Package,
  Key,
  User,
  FileText,
  Star,
  Share2,
  Menu,
  Bell,
  ChevronDown,
  ShoppingCart,
  Settings,
  Plus,
  CheckCircle,
  PackageCheck,
  Globe,
  Grid3x3,
  MapPin,
  UserCheck,
  DollarSign,
  Store,
  Sliders,
  Mail,
  ImageIcon,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import Logo from "@/components/common/header/Logo";
import Link from "next/link";
import { fetchData } from "@/lib/api";

interface Category {
  _id: string;
  name: string;
  level?: number;
  childrenCount?: number;
  parent?: {
    _id: string;
    name: string;
  } | null;
}

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  categories: Category[];
};

export default function Sidebar({ open, setOpen, categories }: SidebarProps) {
  //
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [loadingChildren, setLoadingChildren] = useState<Set<string>>(
    new Set(),
  );
  const [childrenCache, setChildrenCache] = useState<Map<string, Category[]>>(
    new Map(),
  );

  // Get only parent categories (level 0)
  const parentCategories = categories.filter((cat) => cat.level === 0);

  // Find selected category

  // Toggle expand/collapse
  const toggleExpand = async (categoryId: string, hasChildren: boolean) => {
    if (!hasChildren) return;

    const isExpanded = expandedCategories.has(categoryId);

    if (isExpanded) {
      // Collapse
      setExpandedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    } else {
      // Expand - fetch children if not cached
      if (!childrenCache.has(categoryId)) {
        setLoadingChildren((prev) => new Set(prev).add(categoryId));
        try {
          // const response = await axiosPrivate.get(
          //   `/categories/${categoryId}/subcategories`
          // );
          const response = await fetchData(
            `/categories/${categoryId}/subcategories`,
          );
          const children = response || [];
          setChildrenCache((prev) => new Map(prev).set(categoryId, children));
        } catch (error) {
          console.error("Failed to fetch subcategories:", error);
        } finally {
          setLoadingChildren((prev) => {
            const newSet = new Set(prev);
            newSet.delete(categoryId);
            return newSet;
          });
        }
      }

      setExpandedCategories((prev) => new Set(prev).add(categoryId));
    }
  };
  //
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      catalog: false,
      sales: false,
      marketing: false,
      system: false,
      purchase: false,

      users: false,
      employees: false,
      sellers: false,
    },
  );

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const collapseAllExceptActive = () => {
    // Determine which group contains the active page
    const activeGroup = {
      catalog:
        pathname.includes("/products") ||
        pathname.includes("/categories") ||
        pathname.includes("/brands"),
      sales: pathname.includes("/orders") || pathname.includes("/invoices"),
      marketing:
        pathname.includes("/banners") ||
        pathname.includes("/ads-banners") ||
        pathname.includes("/notifications") ||
        pathname.includes("/reviews"),
      system:
        pathname.includes("/social-media") ||
        pathname.includes("/website-config") ||
        pathname.includes("/base-config") ||
        pathname.includes("/component-types"),
      purchase: pathname.includes("/purchases"),
      users:
        pathname.includes("/users") ||
        pathname.includes("/addresses") ||
        pathname.includes("/subscriptions") ||
        pathname.includes("/customers") ||
        pathname.includes("/roles") ||
        pathname.includes("/permissions"),
      employees:
        pathname.includes("/employees") || pathname.includes("/salaries"),
      sellers:
        pathname.includes("/sellers") || pathname.includes("/seller-config"),
    };

    // Set all groups to false except the active one
    setExpandedGroups(activeGroup);
  };

  // Count how many groups are expanded
  const expandedCount = Object.values(expandedGroups).filter(Boolean).length;

  // Auto-expand the group that contains the current page
  useEffect(() => {
    // Determine which group should be expanded based on current pathname
    const newExpandedGroups = {
      catalog:
        pathname.includes("/products") ||
        pathname.includes("/categories") ||
        pathname.includes("/product-types") ||
        pathname.includes("/brands"),
      sales: pathname.includes("/orders") || pathname.includes("/invoices"),
      marketing:
        pathname.includes("/banners") ||
        pathname.includes("/ads-banners") ||
        pathname.includes("/notifications") ||
        pathname.includes("/reviews") ||
        pathname.includes("/contact"),
      system:
        pathname.includes("/social-media") ||
        pathname.includes("/website-config") ||
        pathname.includes("/base-config") ||
        pathname.includes("/component-types"),
      purchase: pathname.includes("/purchases"),
      users:
        pathname.includes("/users") ||
        pathname.includes("/addresses") ||
        pathname.includes("/subscriptions") ||
        pathname.includes("/customers") ||
        pathname.includes("/roles") ||
        pathname.includes("/permissions"),
      employees:
        pathname.includes("/employees") || pathname.includes("/salaries"),
      sellers:
        pathname.includes("/sellers") || pathname.includes("/seller-config"),
    };

    setExpandedGroups(newExpandedGroups);
  }, [pathname]);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const sidebarContent = (
    <div className="flex flex-col ">
      {/* Header */}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 bg-[#1a1a2c] text-white">
        {/* Collapse All Button */}
        {expandedCount > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAllExceptActive}
              className={cn(
                "w-full border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-xs font-medium",
                !open && "px-2 justify-center",
              )}
              title={open ? "Collapse all menus except active" : "Collapse all"}
            >
              <ChevronDown
                size={14}
                className={cn(open && "mr-1.5", "rotate-180")}
              />
              {open && "Collapse All"}
            </Button>
          </motion.div>
        )}

        <div className="space-y-1">
          {renderNavItems(open, expandedGroups, toggleGroup, parentCategories)}
        </div>
      </div>

      {/* Footer */}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex  z-20 flex-col bg-[#1a1a2c] shadow-xl"
        initial={false}
        animate={{
          width: open ? 288 : 80,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
          type: "tween",
        }}
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}

// Helper function to render navigation items
function renderNavItems(
  open: boolean,
  expandedGroups: Record<string, boolean>,
  toggleGroup: (group: string) => void,
  parentCategories: Category[],
) {
  return (
    <>
      {/* Sales & Orders Group */}
      {
        <>
          {parentCategories.map((category) => (
            <React.Fragment key={category._id}>
              <NavGroup
                label={category.name}
                icon={<ShoppingCart size={20} />}
                open={open}
                expanded={expandedGroups[category._id]}
                onToggle={() => toggleGroup(category._id)}
              />

              {expandedGroups[category._id] && (
                <>
                  <NavItem
                    to={`/dashboard/categories/${category._id}`}
                    icon={<Package size={20} />}
                    label="Orders"
                    open={open}
                    isSubItem
                  />

                  <NavItem
                    to={`/dashboard/invoices/${category._id}`}
                    icon={<FileText size={20} />}
                    label="Invoices"
                    open={open}
                    isSubItem
                  />
                </>
              )}
            </React.Fragment>
          ))}
        </>
      }
    </>
  );
}

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  open: boolean;
  end?: boolean;
  isSubItem?: boolean;
};

function NavItem({
  to,
  icon,
  label,
  open,
  end = false,
  isSubItem = false,
}: NavItemProps) {
  return (
    <Link href={to}>
      {
        <>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative z-10 transition-colors duration-200",
              open && "mr-3",

              "text-white/60 group-hover:text-white",
            )}
          >
            {icon}
          </motion.div>

          <AnimatePresence mode="wait">
            {open && (
              <motion.span
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -10, width: 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "relative z-10 font-medium truncate whitespace-nowrap overflow-hidden transition-colors",
                  "text-white",
                )}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      }
    </Link>
  );
}

type NavGroupProps = {
  label: string;
  icon: React.ReactNode;
  open: boolean;
  expanded: boolean;
  onToggle: () => void;
};

function NavGroup({ label, icon, open, expanded, onToggle }: NavGroupProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center py-2.5 rounded-lg text-sm transition-all duration-200 group relative overflow-hidden mt-4 mb-1",
        "hover:bg-white/5",
        "text-white/40 hover:text-white",
        open ? "px-3 justify-between" : "justify-center px-0 w-14 mx-auto",
      )}
    >
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "relative z-10 transition-colors duration-200",
            open && "mr-3",
            "text-white/40 group-hover:text-white",
          )}
        >
          {icon}
        </motion.div>

        <AnimatePresence mode="wait">
          {open && (
            <motion.span
              initial={{ opacity: 0, x: -10, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: -10, width: 0 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative z-10 text-[11px] font-bold uppercase tracking-wider truncate whitespace-nowrap overflow-hidden text-white/50 group-hover:text-white/80"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {open && (
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-white/40"
        >
          <ChevronDown size={14} />
        </motion.div>
      )}
    </button>
  );
}
