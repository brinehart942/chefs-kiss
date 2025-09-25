import {
  getPageByName,
  generateNavigationItems,
  generateFeatures,
  getPageInfo,
  getPagesForRole,
} from "@/constants/structure-data";

export const usePageData = (
  pageName: string,
  role: string = "unauthenticated"
) => {
  const pageData = getPageByName(pageName);

  if (!pageData) {
    return {
      pageData: null,
      navigationItems: [],
      features: [],
      pageInfo: null,
      error: `Page "${pageName}" not found in structure.json`,
    };
  }

  const navigationItems = generateNavigationItems(pageName, role);
  const features = generateFeatures(pageData);
  const pageInfo = getPageInfo(pageData);

  return {
    pageData,
    navigationItems,
    features,
    pageInfo,
    error: null,
  };
};

export const useRolePages = (role: string) => {
  return getPagesForRole(role);
};

export const useNavigationForRole = (role: string) => {
  const pages = getPagesForRole(role);
  return pages.map((page) => ({
    name: page.name,
    route: page.seo_route || `/${page.name.toLowerCase().replace(/\s+/g, "-")}`,
    purpose: page.purpose,
    audience: page.audience,
  }));
};
