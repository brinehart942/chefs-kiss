import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;

  // Get page data from structure.json
  const pageData = getPageByName("Recipe Detail");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Recipe Detail",
    "unauthenticated"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title={`Recipe Detail: ${slug}`}
      description="View recipe and prompts to join"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "View recipe and prompts to join"}
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
