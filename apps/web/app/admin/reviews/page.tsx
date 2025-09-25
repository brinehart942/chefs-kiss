import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function ReviewsPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Review Moderation");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Review Moderation",
    "admin"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Review Moderation"
      description="Moderate reviews and ratings"
      backHref="/admin"
      backText="← Back to Admin Dashboard"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Moderate reviews and ratings"}
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
