import PremiumFeaturePlaceholder from "@/components/common/PremiumFeaturePlaceholder";

export default function NotificationsPage() {
  return (
    <PremiumFeaturePlaceholder
      title="Notifications Center"
      description="Stay updated with real-time notifications for your orders, account activity, and exclusive offers. The complete notification management system is exclusively available in the premium source code."
      features={[
        "Real-time order updates",
        "Personalized alerts and offers",
        "Mark as read/unread tracking",
        "Categorized notification history",
      ]}
    />
  );
}
