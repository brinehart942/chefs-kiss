import Link from "next/link";
import InfoCard from "./InfoCard";
import FeatureList from "./FeatureList";

interface NavigationItem {
  href: string;
  text: string;
  color: string;
}

interface NavigationSectionProps {
  title: string;
  items: NavigationItem[];
  features?: Array<{
    title: string;
    description: string;
  }>;
}

export default function NavigationSection({
  title,
  items,
  features,
}: NavigationSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoCard title={title}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`block w-full ${item.color} text-white py-2 px-4 rounded hover:opacity-90 transition-colors text-center`}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </InfoCard>

      {features && (
        <InfoCard title="Features">
          <FeatureList features={features} />
        </InfoCard>
      )}
    </div>
  );
}
