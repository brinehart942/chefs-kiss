import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function AdminPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Admin Dashboard");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems("Admin Dashboard", "admin");

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  const additionalTools = [
    {
      href: "/admin/ads",
      text: "Ads Review",
      color: "bg-purple-800 hover:bg-purple-900",
    },
    {
      href: "/admin/catalog",
      text: "Catalog Integrity",
      color: "bg-teal-800 hover:bg-teal-900",
    },
  ];

  return (
    <PageLayout title="Admin Dashboard" description="KPIs & queues">
      <PageInfo
        purpose={pageInfo?.purpose || "KPIs & queues"}
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

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Additional Admin Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalTools.map((tool, index) => (
            <a
              key={index}
              href={tool.href}
              className={`block w-full ${tool.color} text-white py-2 px-4 rounded hover:opacity-90 transition-colors text-center`}
            >
              {tool.text}
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
