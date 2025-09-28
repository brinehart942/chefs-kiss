import Link from "next/link";
import { useRolePages } from "@/hooks/usePageData";

export default function Home() {
  // Get all pages organized by role
  const publicPages = useRolePages("unauthenticated");
  const memberPages = useRolePages("member_free");
  const creatorPages = useRolePages("creator_free");
  const teamPages = useRolePages("teams_owner");
  const adminPages = useRolePages("admin");

  // Color mapping for different page types
  const getColorForPage = (pageName: string) => {
    const colorMap: { [key: string]: string } = {
      Search: "bg-blue-500 hover:bg-blue-600",
      "Recipe Detail": "bg-green-500 hover:bg-green-600",
      "Chef Profile": "bg-purple-500 hover:bg-purple-600",
      Marketplace: "bg-yellow-500 hover:bg-yellow-600",
      Auth: "bg-orange-500 hover:bg-orange-600",
      "Sign In": "bg-orange-500 hover:bg-orange-600",
      "Sign Up": "bg-orange-600 hover:bg-orange-700",
      "Meal Planner": "bg-indigo-500 hover:bg-indigo-600",
      "Pantry & Spices": "bg-teal-500 hover:bg-teal-600",
      "Saved Collections": "bg-pink-500 hover:bg-pink-600",
      "Import by URL": "bg-orange-500 hover:bg-orange-600",
      Households: "bg-cyan-500 hover:bg-cyan-600",
      "Studio Dashboard": "bg-red-500 hover:bg-red-600",
      "Creator Studio": "bg-red-500 hover:bg-red-600",
      "Recipe Uploader": "bg-green-500 hover:bg-green-600",
      "Analytics (Basic)": "bg-emerald-500 hover:bg-emerald-600",
      "Profile Editor": "bg-blue-500 hover:bg-blue-600",
      "Batch Import": "bg-purple-500 hover:bg-purple-600",
      "Cookbook Builder": "bg-indigo-500 hover:bg-indigo-600",
      "Schedule Manager": "bg-yellow-500 hover:bg-yellow-600",
      "Profile Themes": "bg-pink-500 hover:bg-pink-600",
      Analytics: "bg-emerald-500 hover:bg-emerald-600",
      "Commerce Center": "bg-violet-500 hover:bg-violet-600",
      "Products Management": "bg-amber-500 hover:bg-amber-600",
      "Sponsored Placements": "bg-rose-500 hover:bg-rose-600",
      "Advanced Insights": "bg-indigo-500 hover:bg-indigo-600",
      "Pixels & UTMs": "bg-purple-500 hover:bg-purple-600",
      "Team Dashboard": "bg-slate-500 hover:bg-slate-600",
      "Shared Cookbooks": "bg-lime-500 hover:bg-lime-600",
      "Client Plan Exports": "bg-sky-500 hover:bg-sky-600",
      "White-Label Branding": "bg-fuchsia-500 hover:bg-fuchsia-600",
      "Admin Dashboard": "bg-gray-800 hover:bg-gray-900",
      "Verification & KYC": "bg-green-800 hover:bg-green-900",
      Payouts: "bg-blue-800 hover:bg-blue-900",
      "Moderate Reviews": "bg-yellow-800 hover:bg-yellow-900",
      "DMCA & IP": "bg-red-800 hover:bg-red-900",
      "Duplicate / Merge": "bg-indigo-800 hover:bg-indigo-900",
      "Ads Review": "bg-purple-800 hover:bg-purple-900",
      "Catalog Integrity": "bg-teal-800 hover:bg-teal-900",
    };

    return colorMap[pageName] || "bg-gray-500 hover:bg-gray-600";
  };

  // Generate route from page name
  const getRouteForPage = (pageName: string) => {
    const routeMap: { [key: string]: string } = {
      "Home / Discover": "/",
      "Home/ Auth": "/",
      Auth: "/auth",
      Search: "/search",
      "Recipe Detail": "/recipe/sample-recipe",
      "Chef Profile": "/chef/sample-chef",
      Marketplace: "/marketplace",
      "Sign In": "/sign-in",
      "Sign Up": "/sign-up",
      "Meal Planner": "/planner",
      "Pantry & Spices": "/pantry",
      "Saved Collections": "/saved",
      "Import by URL": "/import",
      Households: "/households",
      "Studio Dashboard": "/studio",
      "Creator Studio": "/studio",
      "Recipe Uploader": "/studio/recipes",
      "Analytics (Basic)": "/studio/analytics",
      "Profile Editor": "/studio/profile",
      "Batch Import": "/studio/import",
      "Cookbook Builder": "/studio/cookbooks",
      "Schedule Manager": "/studio/schedule",
      "Profile Themes": "/studio/themes",
      Analytics: "/studio/analytics",
      "Commerce Center": "/studio/commerce",
      "Products Management": "/studio/products",
      "Sponsored Placements": "/studio/sponsored",
      "Advanced Insights": "/studio/insights",
      "Pixels & UTMs": "/studio/pixels",
      "Team Dashboard": "/team",
      "Shared Cookbooks": "/team/cookbooks",
      "Client Plan Exports": "/team/exports",
      "White-Label Branding": "/team/branding",
      "Admin Dashboard": "/admin",
      "Verification & KYC": "/admin/kyc",
      Payouts: "/admin/payouts",
      "Moderate Reviews": "/admin/reviews",
      "DMCA & IP": "/admin/dmca",
      "Duplicate / Merge": "/admin/duplicates",
      "Ads Review": "/admin/ads",
      "Catalog Integrity": "/admin/catalog",
    };

    return routeMap[pageName] || "#";
  };

  // Render page section
  const renderPageSection = (
    pages: Array<{ name: string; audience: string }>,
    title: string,
    description: string
  ) => {
    if (pages.length === 0) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          {pages.map((page, index) => (
            <Link
              key={index}
              href={getRouteForPage(page.name)}
              className={`block w-full text-white py-2 px-4 rounded transition-colors text-center ${getColorForPage(
                page.name
              )}`}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-orange-600 mb-4">
            Chef&apos;s Kiss
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The ultimate cooking platform for discovering, creating, and sharing
            recipes
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Dynamic Page Structure
            </h2>
            <p className="text-gray-600 mb-4">
              This home page is now dynamically generated from structure.json
              data!
            </p>
            <div className="text-gray-600 mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-blue-100 p-3 rounded">
                <strong>Public:</strong> {publicPages.length} pages
              </div>
              <div className="bg-green-100 p-3 rounded">
                <strong>Member:</strong> {memberPages.length} pages
              </div>
              <div className="bg-purple-100 p-3 rounded">
                <strong>Creator:</strong> {creatorPages.length} pages
              </div>
              <div className="bg-orange-100 p-3 rounded">
                <strong>Team:</strong> {teamPages.length} pages
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {renderPageSection(
            publicPages,
            "Public Pages",
            "Available to all users"
          )}
          {renderPageSection(
            memberPages,
            "Member Pages",
            "For registered users"
          )}
          {renderPageSection(
            creatorPages,
            "Creator Pages",
            "For content creators"
          )}
          {renderPageSection(teamPages, "Team Pages", "For team accounts")}
          {renderPageSection(adminPages, "Admin Pages", "For administrators")}
        </div>
      </div>
    </div>
  );
}
