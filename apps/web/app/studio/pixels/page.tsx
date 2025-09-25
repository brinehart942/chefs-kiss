import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function PixelsPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Pixels & UTMs");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems("Pixels & UTMs", "chef_pro");

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Pixels & UTMs"
      description="Configure tracking and analytics"
      backHref="/studio"
      backText="← Back to Studio"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Configure tracking and analytics"}
        roleVisibility={pageInfo?.roleVisibility || "chef_pro"}
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
        title="Studio Navigation"
        items={navigationItems}
        features={features}
      />
    </PageLayout>
  );
}
