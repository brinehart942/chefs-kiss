interface InfoItemProps {
  label: string;
  value: string | string[];
  className?: string;
}

export default function InfoItem({
  label,
  value,
  className = "",
}: InfoItemProps) {
  const displayValue = Array.isArray(value) ? value.join(", ") : value;

  return (
    <p className={className}>
      <strong>{label}:</strong> {displayValue}
    </p>
  );
}
