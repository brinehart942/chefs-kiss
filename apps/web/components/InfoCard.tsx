interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function InfoCard({
  title,
  children,
  className = "",
}: InfoCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-gray-900">{children}</div>
    </div>
  );
}
