import InfoCard from "./InfoCard";
import InfoItem from "./InfoItem";

interface PageInfoProps {
  purpose: string;
  roleVisibility: string;
  keyComponents: string[];
  primaryActions: string[];
  featureFlags?: string[];
  dataEntities: string[];
  events: string[];
  entryPoints: string[];
  dependencies: string[];
  edgeCases: string[];
  seoRoute?: string;
}

export default function PageInfo({
  purpose,
  roleVisibility,
  keyComponents,
  primaryActions,
  featureFlags = [],
  dataEntities,
  events,
  entryPoints,
  dependencies,
  edgeCases,
  seoRoute,
}: PageInfoProps) {
  return (
    <InfoCard title="Page Information">
      <InfoItem label="Purpose" value={purpose} />
      <InfoItem label="Role Visibility" value={roleVisibility} />
      <InfoItem label="Key Components" value={keyComponents} />
      <InfoItem label="Primary Actions" value={primaryActions} />
      {featureFlags.length > 0 && (
        <InfoItem label="Feature Flags" value={featureFlags} />
      )}
      <InfoItem label="Data Entities" value={dataEntities} />
      <InfoItem label="Events" value={events} />
      <InfoItem label="Entry Points" value={entryPoints} />
      <InfoItem label="Dependencies" value={dependencies} />
      <InfoItem label="Edge Cases" value={edgeCases} />
      {seoRoute && <InfoItem label="SEO Route" value={seoRoute} />}
    </InfoCard>
  );
}
