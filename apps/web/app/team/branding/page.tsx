import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function BrandingPage() {
  // Get page data from structure.json
  const pageData = getPageByName("White-Label Branding");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "White-Label Branding",
    "teams_owner"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="White-Label Branding"
      description="Customize branding for client plans"
      backHref="/team"
      backText="← Back to Team Dashboard"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Customize branding for client plans"}
        roleVisibility={pageInfo?.roleVisibility || "teams_owner"}
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
        title="Team Navigation"
        items={navigationItems}
        features={features}
      />
    </PageLayout>
  );
}
