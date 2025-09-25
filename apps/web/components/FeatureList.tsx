interface Feature {
  title: string;
  description: string;
}

interface FeatureListProps {
  features: Feature[];
  className?: string;
}

export default function FeatureList({
  features,
  className = "",
}: FeatureListProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {features.map((feature, index) => (
        <div key={index} className="p-3 bg-gray-100 rounded">
          <strong>{feature.title}:</strong> {feature.description}
        </div>
      ))}
    </div>
  );
}
