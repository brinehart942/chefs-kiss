import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function ImportPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Import by URL");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Import by URL",
    "member_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Import by URL"
      description="Bring recipes from other sites"
    >
      <PageInfo
        purpose={
          pageInfo?.purpose || "Bring recipes (quota-limited for free users)"
        }
        roleVisibility={
          pageInfo?.roleVisibility || "member_free, member_plus, member_pro"
        }
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
