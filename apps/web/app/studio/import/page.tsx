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
  const pageData = getPageByName("Batch Import");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Batch Import",
    "creator_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Batch Import"
      description="Bulk import recipes from various sources"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Bulk add recipes"}
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
        title="Import Options"
        items={navigationItems}
        features={features}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Import Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700 mb-2">CSV Upload</h4>
            <p className="text-sm text-gray-600 mb-3">
              Import recipes from CSV files
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm">
              Upload CSV
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700 mb-2">URL Import</h4>
            <p className="text-sm text-gray-600 mb-3">
              Import from recipe URLs
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm">
              Import URLs
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-gray-700 mb-2">Manual Entry</h4>
            <p className="text-sm text-gray-600 mb-3">Add recipes one by one</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded text-sm">
              Add Recipe
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
