import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function TeamCookbooksPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Shared Cookbooks");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Shared Cookbooks",
    "teams_owner"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Shared Cookbooks"
      description="Org cookbook library"
      backHref="/team"
      backText="← Back to Team Dashboard"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Org cookbook library"}
        roleVisibility={pageInfo?.roleVisibility || "teams_owner, teams_member"}
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
