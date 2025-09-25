import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function HouseholdsPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Households");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems("Households", "member_pro");

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout title="Households" description="Manage multi-household">
      <PageInfo
        purpose={pageInfo?.purpose || "Manage multi-household"}
        roleVisibility={pageInfo?.roleVisibility || "member_pro"}
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
        title="Navigation Options"
        items={navigationItems}
        features={features}
      />
    </PageLayout>
  );
}
