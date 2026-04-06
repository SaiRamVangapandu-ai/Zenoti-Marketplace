interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
}

export default function MetricCard({ label, value, subtext }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}
