import PremiumFeaturePlaceholder from "@/components/common/PremiumFeaturePlaceholder";

export default function Wishlist() {
  return (
    <PremiumFeaturePlaceholder
      title="My Wishlist"
      description="Save your favorite products to your personal wishlist and get notified when they go on sale. This feature is exclusively available in the premium source code."
      features={[
        "Save unlimited products for later",
        "Price drop notifications",
        "Organize by custom collections",
        "Share wishlists with friends",
      ]}
    />
  );
}
