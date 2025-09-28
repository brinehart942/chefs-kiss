import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function RecipesPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Recipe Uploader");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Recipe Uploader",
    "creator_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Recipe Manager"
      description="Create, edit, and manage your recipes"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Create/edit recipes"}
        roleVisibility={
          pageInfo?.roleVisibility ||
          "creator_free, creator_plus, chef_pro, chef_pro_plus, teams_owner, teams_member"
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
        title="Recipe Management"
        items={navigationItems}
        features={features}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/studio/recipes/new"
            className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded hover:opacity-90 transition-colors text-center"
          >
            Create New Recipe
          </a>
          <a
            href="/studio/recipes/drafts"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded hover:opacity-90 transition-colors text-center"
          >
            View Drafts
          </a>
          <a
            href="/studio/recipes/published"
            className="block w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded hover:opacity-90 transition-colors text-center"
          >
            Published Recipes
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
