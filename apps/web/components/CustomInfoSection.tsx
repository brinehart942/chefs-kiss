import InfoCard from "./InfoCard";
import InfoItem from "./InfoItem";

interface CustomInfoSectionProps {
  title: string;
  items: Array<{
    label: string;
    value: string | string[];
  }>;
  className?: string;
}

export default function CustomInfoSection({
  title,
  items,
  className = "",
}: CustomInfoSectionProps) {
  return (
    <InfoCard title={title} className={className}>
      {items.map((item, index) => (
        <InfoItem key={index} label={item.label} value={item.value} />
      ))}
    </InfoCard>
  );
}
