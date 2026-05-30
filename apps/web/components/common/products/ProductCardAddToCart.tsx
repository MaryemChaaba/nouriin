"use client";

import { Product } from "@entry/types";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore, useCartStore, useUserStore } from "@/lib/store";
import { useAuthSidebarStore } from "@/lib/useAuthSidebarStore";
import { useCartSidebarStore } from "@/lib/useCartSidebarStore";

export default function ProductCardAddToCart({
  product,
}: {
  product: Product;
}) {
  const [adding, setAdding] = useState(false);
  const { addItem } = useStore();
  const { isAuthenticated } = useUserStore();
  const { openLogin } = useAuthSidebarStore();
  const { open } = useCartSidebarStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    // if (!isAuthenticated) {
    //   openLogin();
    //   return;
    // }
    if (!product?.stock) {
      toast.error("Out of stock");
      return;
    }
    setAdding(true);
    try {
      await addItem(product);
      // toast.success("Added to cart!");
      open();
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={adding || !product?.stock}
      className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {adding ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <ShoppingCart className="size-3.5" />
      )}
      {adding ? "Adding…" : !product?.stock ? "Out of stock" : "add to cart"}
    </button>
  );
}
