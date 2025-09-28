import structureData from "../../../structure.json";

// Type definitions
interface PageData {
  name: string;
  purpose: string;
  key_components: string[];
  primary_actions: string[];
  role_visibility: string[];
  feature_flags: string[];
  data_entities: string[];
  events: string[];
  entry_points: string[];
  dependencies: string[];
  edge_cases: string[];
  seo_route: string | null;
  mobile_variants?: string[];
}

interface NavigationItem {
  name: string;
  route: string;
  icon: string;
  visibility_note: string;
}

interface StructureData {
  pages_by_audience: Record<string, PageData[]>;
  global_navigation: Record<string, NavigationItem[]>;
}

// Extract page data by audience
export const getPagesByAudience = (audience: string): PageData[] => {
  return (structureData as StructureData).pages_by_audience[audience] || [];
};

// Extract navigation data
export const getNavigationByRole = (role: string): NavigationItem[] => {
  return (structureData as StructureData).global_navigation[role] || [];
};

// Get specific page data by name
export const getPageByName = (
  name: string
): (PageData & { audience: string }) | null => {
  for (const audience in structureData.pages_by_audience) {
    const pages = (structureData as StructureData).pages_by_audience[audience];
    const page = pages.find((p: PageData) => p.name === name);
    if (page) return { ...page, audience };
  }
  return null;
};

// Get page data by route
export const getPageByRoute = (
  route: string
): (PageData & { audience: string }) | null => {
  for (const audience in structureData.pages_by_audience) {
    const pages = (structureData as StructureData).pages_by_audience[audience];
    const page = pages.find((p: PageData) => p.seo_route === route);
    if (page) return { ...page, audience };
  }
  return null;
};

// Generate navigation items for a specific page
export const generateNavigationItems = (currentPage: string, role: string) => {
  const navigation = getNavigationByRole(role);
  const colorMap: { [key: string]: string } = {
    "Home / Discover": "bg-blue-500 hover:bg-blue-600",
    Search: "bg-green-500 hover:bg-green-600",
    "Recipe Detail": "bg-purple-500 hover:bg-purple-600",
    "Chef Profile": "bg-yellow-500 hover:bg-yellow-600",
    Marketplace: "bg-yellow-500 hover:bg-yellow-600",
    "Sign In/Up": "bg-gray-500 hover:bg-gray-600",
    "Meal Planner": "bg-indigo-500 hover:bg-indigo-600",
    "Pantry & Spices": "bg-teal-500 hover:bg-teal-600",
    "Saved Collections": "bg-pink-500 hover:bg-pink-600",
    "Import by URL": "bg-orange-500 hover:bg-orange-600",
    Households: "bg-cyan-500 hover:bg-cyan-600",
    "Studio Dashboard": "bg-red-500 hover:bg-red-600",
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
    "KYC Verification": "bg-green-800 hover:bg-green-900",
    "Payouts Management": "bg-blue-800 hover:bg-blue-900",
    "Review Moderation": "bg-yellow-800 hover:bg-yellow-900",
    "DMCA & IP": "bg-red-800 hover:bg-red-900",
    "Duplicate Management": "bg-indigo-800 hover:bg-indigo-900",
  };

  return navigation
    .filter((item: NavigationItem) => item.name !== currentPage)
    .map((item: NavigationItem) => ({
      href: item.route,
      text: item.name,
      color: colorMap[item.name] || "bg-gray-500 hover:bg-gray-600",
    }));
};

// Generate features from page data
export const generateFeatures = (pageData: PageData | null) => {
  if (!pageData || !pageData.key_components) return [];

  const featureDescriptions: { [key: string]: string } = {
    SearchBar: "Search for recipes and chefs",
    QuickFilters: "Filter results quickly",
    ResultsGrid: "Display search results",
    CategoryChips: "Browse by category",
    HeroMedia: "Recipe images and videos",
    Ingredients: "Ingredient lists",
    Steps: "Cooking instructions",
    NutritionSummary: "Nutritional information",
    ChefAttribution: "Chef information",
    SaveCTA: "Save recipe button",
    StartCookingCTA: "Start cooking button",
    ChefHeader: "Chef profile header",
    FollowCTA: "Follow chef button",
    RecipeGrid: "Chef's recipe collection",
    ProductsRail: "Paid content display",
    CategoryTabs: "Product category filters",
    ProductCards: "Product display cards",
    HeroPromo: "Featured promotions",
    CollectionsList: "Saved collections",
    CreateCollection: "Create new collections",
    PantryItems: "Pantry inventory",
    AddItem: "Add pantry items",
    SpiceChecklist: "Spice inventory",
    UpsellPlusInline: "Upgrade prompts",
    URLField: "Recipe URL input",
    ParseProgress: "Import progress",
    QuotaMeter: "Import quota tracking",
    UpsellProInline: "Pro upgrade prompts",
    HouseholdList: "Household management",
    AddHousehold: "Create households",
    SwitchHousehold: "Change active household",
    ShareInvite: "Invite family members",
    ViewsChart: "Recipe view analytics",
    TopRecipesTable: "Best performing recipes",
    RatingsSummary: "Rating overview",
    KYCStatus: "Identity verification status",
    ConnectPayments: "Payment setup",
    ProductTypesTiles: "Product type options",
    SellingToggle: "Enable/disable selling",
    PlacementCalendar: "Ad placement calendar",
    DatesPicker: "Select placement dates",
    BudgetField: "Set advertising budget",
    ForecastPanel: "Placement forecasts",
    CohortsTable: "User cohort analysis",
    TrafficSources: "Traffic source breakdown",
    RetentionCurves: "User retention analysis",
    PixelInputs: "Configure tracking pixels",
    UTMDefaults: "Set UTM parameters",
    VerificationStatus: "Track pixel verification",
    ExportTemplates: "Pre-built export templates",
    CustomFields: "Customize export fields",
    ScheduleExports: "Automated export scheduling",
    ExportHistory: "View past exports",
    LogoUpload: "Upload company logo",
    ColorScheme: "Customize brand colors",
    CustomDomain: "Set up custom domain",
    WhiteLabelSettings: "Configure white-label options",
    PayoutRuns: "Manage payout batches",
    HoldReasons: "Track payout holds",
    ReleaseButton: "Release held payouts",
    RefundManagement: "Process refunds",
    FlaggedList: "Review flagged content",
    ContentViewer: "View review content",
    ActionsBar: "Moderation actions",
    UserManagement: "Manage user accounts",
    CasesTable: "View DMCA cases",
    EvidenceViewer: "Review evidence",
    DecisionPanel: "Make case decisions",
    LegalNotices: "Send legal notices",
    DuplicateClusters: "View duplicate groups",
    DiffViewer: "Compare duplicate content",
    MergeTool: "Merge duplicate recipes",
    SimilarityDetection: "Find similar content",
  };

  return pageData.key_components.map((component: string) => ({
    title: component,
    description: featureDescriptions[component] || `${component} functionality`,
  }));
};

// Get page info data
export const getPageInfo = (pageData: PageData | null) => {
  if (!pageData) return null;

  return {
    purpose: pageData.purpose,
    roleVisibility: Array.isArray(pageData.role_visibility)
      ? pageData.role_visibility.join(", ")
      : pageData.role_visibility,
    keyComponents: pageData.key_components || [],
    primaryActions: pageData.primary_actions || [],
    featureFlags: pageData.feature_flags || [],
    dataEntities: pageData.data_entities || [],
    events: pageData.events || [],
    entryPoints: pageData.entry_points || [],
    dependencies: pageData.dependencies || [],
    edgeCases: pageData.edge_cases || [],
    seoRoute: pageData.seo_route,
  };
};

// Role-based page access
export const getPagesForRole = (
  role: string
): (PageData & { audience: string })[] => {
  const allPages: (PageData & { audience: string })[] = [];

  for (const audience in structureData.pages_by_audience) {
    const pages = (structureData as StructureData).pages_by_audience[audience];
    pages.forEach((page: PageData) => {
      if (
        page.role_visibility.includes(role) ||
        page.role_visibility.includes("unauthenticated")
      ) {
        allPages.push({ ...page, audience });
      }
    });
  }

  return allPages;
};
