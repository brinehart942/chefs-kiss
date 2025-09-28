import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function ThemesPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Profile Themes");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Profile Themes",
    "creator_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Profile Themes"
      description="Customize your chef profile appearance"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Customize storefront"}
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
        title="Theme Customization"
        items={navigationItems}
        features={features}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Available Themes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50">
            <h4 className="font-semibold text-gray-700 mb-2">Chef's Classic</h4>
            <p className="text-sm text-gray-600 mb-3">
              Warm orange and red tones
            </p>
            <div className="text-xs text-orange-600 font-medium">Active</div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
            <h4 className="font-semibold text-gray-700 mb-2">Minimalist</h4>
            <p className="text-sm text-gray-600 mb-3">
              Clean and simple design
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Select
            </button>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 hover:border-gray-400 cursor-pointer">
            <h4 className="font-semibold text-gray-700 mb-2">Rustic</h4>
            <p className="text-sm text-gray-600 mb-3">
              Earthy browns and greens
            </p>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Select
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
