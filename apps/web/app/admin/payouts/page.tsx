import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function PayoutsPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Payouts Management");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Payouts Management",
    "admin"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Payouts Management"
      description="Manage creator payouts"
      backHref="/admin"
      backText="← Back to Admin Dashboard"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Manage creator payouts"}
        roleVisibility={pageInfo?.roleVisibility || "admin"}
        keyComponents={pageInfo?.keyComponents || []}
        primaryActions={pageInfo?.primaryActions || []}
        featureFlags={pageInfo?.featureFlags || []}
        dataEntities={pageInfo?.dataEntities || []}
        events={pageInfo?.events || []}
        entryPoints={pageInfo?.entryPoints || []}
        dependencies={pageInfo?.dependencies || []}
        edgeCases={pageInfo?.edgeCases || []}
        seoRoute={pageInfo?.seoRoute || undefined}
      />

      <NavigationSection
        title="Admin Navigation"
        items={navigationItems}
        features={features}
      />
    </PageLayout>
  );
}
