import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { fetchData } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";

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

interface NestedCategorySelectorProps {
  categories: Category[];
  value: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function NestedCategorySelector({
  categories,
  value,
  onValueChange,
  disabled = false,
  placeholder = "Select category...",
}: NestedCategorySelectorProps) {
  const [open, setOpen] = useState(false);
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
  const selectedCategory = categories.find((cat) => cat._id === value);

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

  // Render category items recursively
  const renderCategoryItem = (category: Category, depth: number = 0) => {
    const isExpanded = expandedCategories.has(category._id);
    const isLoading = loadingChildren.has(category._id);
    const hasChildren = (category.childrenCount || 0) > 0;

    const children = childrenCache.get(category._id) || [];
    const isSelected = value === category._id;

    return (
      <div key={category._id}>
        <button
          value={category._id}
          onSelect={() => {
            onValueChange(category._id);
            setOpen(false);
          }}
          className={cn(
            "cursor-pointer",
            isSelected && "bg-accent",
            depth == 0 && "font-semibold",
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <div className="flex items-center gap-1 w-full">
            {/* <Check
              className={cn(
                "mr-2 h-4 w-4",
                isSelected ? "opacity-100" : "opacity-0",
              )}
            /> */}
            <Checkbox />
            <span className="flex-1">{category.name}</span>
            {hasChildren && (
              <Badge variant="outline" className="text-xs">
                {category.childrenCount}
              </Badge>
            )}
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(category._id, hasChildren);
                }}
                className="hover:bg-gray-200 rounded p-0.5 text-sm"
              >
                {isLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
          </div>
        </button>
        {isExpanded && children.length > 0 && (
          <div>
            {children.map((child) => renderCategoryItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>{parentCategories.map((category) => renderCategoryItem(category, 0))}</>
  );
}
