import services from "@/data/services.json";
import bookings from "@/data/bookings.json";
import businesses from "@/data/businesses.json";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";

export default function Dashboard() {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const marketplaceRevenue = Math.round(totalRevenue * 0.32);
  const repeatRate = "68%";

  // Top businesses by booking count
  const bizBookingCounts: Record<string, number> = {};
  const bizRevenue: Record<string, number> = {};
  bookings.forEach((bk) => {
    const name = bk.businessName;
    bizBookingCounts[name] = (bizBookingCounts[name] || 0) + 1;
    bizRevenue[name] = (bizRevenue[name] || 0) + bk.price;
  });
  const topBusinesses = Object.entries(bizBookingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Top services by revenue
  const svcRevenue: Record<string, number> = {};
  bookings.forEach((bk) => {
    const svc = services.find((s) => s.id === bk.serviceId);
    if (svc) svcRevenue[svc.name] = (svcRevenue[svc.name] || 0) + bk.price;
  });
  const topServices = Object.entries(svcRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Find highest revenue business
  const highestRevBiz = Object.entries(bizRevenue).sort((a, b) => b[1] - a[1])[0];
  const highestRevBizName = highestRevBiz ? highestRevBiz[0] : "—";

  // Find location for highest revenue business
  const highestRevBizData = businesses.find((b) => b.name === highestRevBizName);
  const highestRevBizLocation = highestRevBizData
    ? `${highestRevBizName} ${highestRevBizData.neighborhood}`
    : highestRevBizName;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Business impact overview for Zenoti Marketplace.</p>
        </div>
        <span className="hidden rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 sm:block">
          Owner View
        </span>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Bookings" value={String(totalBookings)} subtext="All time" />
        <MetricCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} subtext="Gross booking value" />
        <MetricCard label="Marketplace Revenue" value={`$${marketplaceRevenue.toLocaleString()}`} subtext="Zenoti marketplace share" />
        <MetricCard label="Repeat Booking Rate" value={repeatRate} subtext="Returning customers" />
      </div>

      {/* Insights */}
      <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
        <h3 className="text-sm font-semibold text-violet-900">Marketplace Insights</h3>
        <ul className="mt-3 space-y-2 text-sm text-violet-800">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            32% of recent bookings are coming from Zenoti Marketplace.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            Top-performing category this week: Medspa.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            Highest revenue business: {highestRevBizLocation}.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
            Average booking value: ${Math.round(totalRevenue / totalBookings).toLocaleString()} — 23% above industry average.
          </li>
        </ul>
      </div>

      {/* Two-column: Top Businesses + Top Services */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeader title="Top Businesses by Bookings" />
          <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
            {topBusinesses.map(([name, count], i) => (
              <div key={name} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">{i + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{name}</span>
                </div>
                <span className="text-sm text-gray-500">{count} bookings</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader title="Top Services by Revenue" />
          <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
            {topServices.map(([name, rev], i) => (
              <div key={name} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">{i + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">${rev.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <section className="mt-8">
        <SectionHeader title="Recent Bookings" />
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Business</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bk) => {
                const svc = services.find((s) => s.id === bk.serviceId);
                return (
                  <tr key={bk.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-4 py-3 font-medium text-gray-900">{bk.userName}</td>
                    <td className="px-4 py-3 text-gray-600">{svc?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{bk.businessName}</td>
                    <td className="px-4 py-3 text-gray-600">{bk.date}</td>
                    <td className="px-4 py-3 text-gray-600">{bk.time}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">${bk.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
