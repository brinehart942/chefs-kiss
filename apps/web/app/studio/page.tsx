import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
} from "@/constants/structure-data";

export default function StudioPage() {
  // Get page data from structure.json
  const pageData = getPageByName("Creator Studio");

  if (!pageData) {
    return <div>Page not found</div>;
  }

  // Generate navigation items dynamically
  const navigationItems = generateNavigationItems(
    "Creator Studio",
    "creator_free"
  );

  // Generate features from page data
  const features = generateFeatures(pageData);

  // Get page info data
  const pageInfo = getPageInfo(pageData);

  const additionalTools = [
    {
      href: "/studio/recipes",
      text: "Recipe Manager",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      href: "/studio/cookbooks",
      text: "Cookbook Builder",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      href: "/studio/schedule",
      text: "Schedule Manager",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      href: "/studio/themes",
      text: "Profile Themes",
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      href: "/studio/integrations",
      text: "Integrations",
      color: "bg-cyan-500 hover:bg-cyan-600",
    },
    {
      href: "/studio/domains",
      text: "Domains",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <PageLayout
      title="Creator Studio"
      description="Overview and setup for creators"
    >
      <PageInfo
        purpose={pageInfo?.purpose || "Overview and setup"}
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
        title="Studio Navigation"
        items={navigationItems}
        features={features}
      />

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Additional Creator Tools
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
