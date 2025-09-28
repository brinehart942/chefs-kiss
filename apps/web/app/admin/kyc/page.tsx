import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function KYCPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Verification & KYC");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Verification & KYC",
    "admin"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Verification & KYC"
      description="Verify chefs and payouts"
      backHref="/admin"
      backText="← Back to Admin Dashboard"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Verify chefs and payouts"}
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
