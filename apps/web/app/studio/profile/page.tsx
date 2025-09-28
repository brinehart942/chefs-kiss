import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function ProfilePage() {
  // Get page data from structure.json
  const pageData = getPageByName("Profile Editor");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Profile Editor",
    "creator_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  return (
    <PageLayout
      title="Profile Editor"
      description="Manage your public chef profile"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Manage public profile"}
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
        title="Profile Management"
        items={navigationItems}
        features={features}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Profile Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Basic Info</h4>
            <p className="text-sm text-gray-600">
              Update your name, bio, and profile picture
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Social Links</h4>
            <p className="text-sm text-gray-600">
              Connect your social media accounts
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
