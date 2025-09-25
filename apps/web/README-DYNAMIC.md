# Dynamic Page System

This application now uses a dynamic page system that pulls data directly from `structure.json`, making it much more maintainable and consistent.

## 🏗️ Architecture

### Core Files

1. **`/constants/structure-data.ts`** - Main data extraction and utility functions
2. **`/hooks/usePageData.ts`** - React hooks for easy data access
3. **Dynamic Pages** - Pages that use the structure data instead of hardcoded values

### Key Features

- **Single Source of Truth**: All page data comes from `structure.json`
- **Dynamic Navigation**: Navigation items are generated based on role and page context
- **Automatic Feature Generation**: Page features are extracted from key components
- **Type Safety**: Full TypeScript support throughout
- **Role-Based Access**: Different navigation and features based on user role

## 📊 Data Flow

```
structure.json → constants/structure-data.ts → hooks/usePageData.ts → Pages
```

## 🛠️ Usage Examples

### Basic Page with Dynamic Data

```tsx
import { usePageData } from "@/hooks/usePageData";

export default function MyPage() {
  const { pageData, navigationItems, features, pageInfo, error } = usePageData("Search", "unauthenticated");
  
  if (error) return <div>{error}</div>;
  
  return (
    <PageLayout title="Search" description={pageInfo?.purpose}>
      <PageInfo {...pageInfo} />
      <NavigationSection items={navigationItems} features={features} />
    </PageLayout>
  );
}
```

### Dynamic Home Page

```tsx
import { useRolePages } from "@/hooks/usePageData";

export default function Home() {
  const publicPages = useRolePages("unauthenticated");
  const memberPages = useRolePages("member_free");
  
  return (
    <div>
      {renderPageSection(publicPages, "Public Pages", "Available to all users")}
      {renderPageSection(memberPages, "Member Pages", "For registered users")}
    </div>
  );
}
```

## 🔧 Available Functions

### Data Extraction Functions

- `getPageByName(name)` - Get specific page data by name
- `getPageByRoute(route)` - Get page data by SEO route
- `getPagesByAudience(audience)` - Get all pages for an audience
- `getNavigationByRole(role)` - Get navigation items for a role

### Utility Functions

- `generateNavigationItems(currentPage, role)` - Generate navigation for a page
- `generateFeatures(pageData)` - Generate features from page data
- `getPageInfo(pageData)` - Extract page info for PageInfo component
- `getPagesForRole(role)` - Get all pages accessible by a role

### React Hooks

- `usePageData(pageName, role)` - Complete page data with error handling
- `useRolePages(role)` - All pages for a specific role
- `useNavigationForRole(role)` - Navigation data for a role

## 🎨 Dynamic Features

### Automatic Color Mapping

Pages automatically get appropriate colors based on their name and purpose:

- **Public Pages**: Blue, Green, Purple, Yellow
- **Member Pages**: Indigo, Teal, Pink, Orange, Cyan
- **Creator Pages**: Red, Emerald, Violet, Amber, Rose
- **Team Pages**: Slate, Lime, Sky, Fuchsia
- **Admin Pages**: Gray, Green, Blue, Yellow, Red, Indigo (dark variants)

### Feature Descriptions

Component names are automatically mapped to user-friendly descriptions:

- `SearchBar` → "Search for recipes and chefs"
- `QuickFilters` → "Filter results quickly"
- `ResultsGrid` → "Display search results"
- `CategoryChips` → "Browse by category"

## 📈 Benefits

1. **Maintainability**: Change structure.json, all pages update automatically
2. **Consistency**: All pages use the same data source and patterns
3. **Scalability**: Easy to add new pages or modify existing ones
4. **Type Safety**: Full TypeScript support prevents runtime errors
5. **DRY Principle**: No more duplicated page data across files

## 🚀 Migration Guide

### Before (Hardcoded)
```tsx
const navigationItems = [
  { href: "/", text: "Home", color: "bg-blue-500" },
  { href: "/search", text: "Search", color: "bg-green-500" },
];

const features = [
  { title: "Search Bar", description: "Search for recipes" },
];
```

### After (Dynamic)
```tsx
const { navigationItems, features } = usePageData("Search", "unauthenticated");
```

## 🔄 Adding New Pages

1. Add page definition to `structure.json`
2. Create page component using `usePageData` hook
3. Navigation and features are automatically generated
4. No need to manually maintain navigation items or feature lists

## 🎯 Future Enhancements

- **Dynamic Routing**: Generate routes automatically from structure.json
- **Permission System**: Role-based page visibility
- **A/B Testing**: Feature flags for different page variants
- **Analytics Integration**: Automatic event tracking from structure.json
- **SEO Optimization**: Dynamic meta tags from page data

## 📝 Example: Complete Dynamic Page

```tsx
import PageLayout from "@/components/PageLayout";
import PageInfo from "@/components/PageInfo";
import NavigationSection from "@/components/NavigationSection";
import { usePageData } from "@/hooks/usePageData";

export default function DynamicPage() {
  const { pageData, navigationItems, features, pageInfo, error } = usePageData("Search", "unauthenticated");
  
  if (error) return <div>Error: {error}</div>;
  
  return (
    <PageLayout 
      title={pageData?.name || "Page"} 
      description={pageInfo?.purpose || "Page description"}
    >
      <PageInfo {...pageInfo} />
      <NavigationSection 
        title="Navigation Options"
        items={navigationItems}
        features={features}
      />
    </PageLayout>
  );
}
```

This system makes the application much more maintainable and ensures consistency across all pages! 🎉
