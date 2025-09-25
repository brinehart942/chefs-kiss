import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function AuthPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Sign In/Up");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Sign In/Up",
    "unauthenticated"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout title="Sign In / Sign Up" description="Authentication page">
      <PageInfo
        purpose={pageInfo?.purpose || "Sign up / sign in"}
        roleVisibility={pageInfo?.roleVisibility || "unauthenticated"}
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
