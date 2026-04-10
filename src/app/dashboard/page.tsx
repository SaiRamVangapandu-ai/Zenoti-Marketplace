import services from "@/data/services.json";
import bookings from "@/data/bookings.json";
import businesses from "@/data/businesses.json";

function TrendBadge({ value, label }: { value: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
      {value}{label ? ` ${label}` : ""}
    </span>
  );
}

export default function Dashboard() {
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const marketplaceRevenue = Math.round(totalRevenue * 0.32);
  const avgBookingValue = Math.round(totalRevenue / totalBookings);

  // Category breakdown
  const categoryRevenue: Record<string, number> = {};
  bookings.forEach((bk) => {
    const svc = services.find((s) => s.id === bk.serviceId);
    if (svc) categoryRevenue[svc.category] = (categoryRevenue[svc.category] || 0) + bk.price;
  });
  const topCategory = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

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

  const highestRevBiz = Object.entries(bizRevenue).sort((a, b) => b[1] - a[1])[0];
  const highestRevBizName = highestRevBiz ? highestRevBiz[0] : "—";
  const highestRevBizData = businesses.find((b) => b.name === highestRevBizName);
  const highestRevBizLocation = highestRevBizData
    ? `${highestRevBizName} (${highestRevBizData.city})`
    : highestRevBizName;

  const metrics = [
    {
      label: "Total Bookings",
      value: String(totalBookings),
      subtext: "Last 7 days",
      trend: "+18%",
    },
    {
      label: "Gross Booking Value",
      value: `$${totalRevenue.toLocaleString()}`,
      subtext: "Across all locations",
      trend: "+24%",
    },
    {
      label: "Marketplace Revenue",
      value: `$${marketplaceRevenue.toLocaleString()}`,
      subtext: "32% platform share",
      trend: "+31%",
    },
    {
      label: "Avg Booking Value",
      value: `$${avgBookingValue}`,
      subtext: "23% above industry avg",
      trend: "+9%",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Week of April 3–10, 2026 · Zenoti Marketplace pilot</p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600 sm:block">
          CEO View
        </span>
      </div>

      {/* KPI Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{m.label}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{m.value}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-gray-400">{m.subtext}</p>
              <TrendBadge value={m.trend} label="vs last week" />
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Insights */}
      <div className="mt-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-violet-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
          <h3 className="text-sm font-semibold text-violet-900">Marketplace Insights</h3>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { icon: "📈", text: `32% of revenue flowing through Zenoti Marketplace — new channel with zero cannibalization` },
            { icon: "🏆", text: `Top category: ${topCategory} — highest avg ticket at $${Math.round((categoryRevenue[topCategory] || 0) / bookings.filter(b => services.find(s => s.id === b.serviceId)?.category === topCategory).length || 1)}` },
            { icon: "📍", text: `Highest revenue business: ${highestRevBizLocation}` },
            { icon: "🔁", text: `68% repeat booking rate — customers return within 30 days` },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-3 rounded-xl bg-white/70 p-3">
              <span className="text-base">{item.icon}</span>
              <p className="text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: Top Businesses + Top Services */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Top Businesses by Bookings</h2>
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            {topBusinesses.map(([name, count], i) => {
              const biz = businesses.find((b) => b.name === name);
              return (
                <div key={name} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}`}>{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{name}</p>
                    {biz && <p className="text-xs text-gray-400">{biz.city}, {biz.state}</p>}
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-gray-700">{count} bookings</span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Top Services by Revenue</h2>
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            {topServices.map(([name, rev], i) => (
              <div key={name} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-gray-50" : ""}`}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i === 0 ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}`}>{i + 1}</span>
                <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">{name}</p>
                <span className="shrink-0 text-sm font-bold text-gray-900">${rev.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <section className="mt-8 pb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Recent Bookings</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
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
                const dateStr = new Date(bk.date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                return (
                  <tr key={bk.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-xs font-semibold text-violet-600">
                          {bk.userName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{bk.userName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{svc?.name ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{bk.businessName}</td>
                    <td className="px-4 py-3 text-gray-500">{dateStr}</td>
                    <td className="px-4 py-3 text-gray-500">{bk.time}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">${bk.price}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t-2 border-gray-100 bg-gray-50">
              <tr>
                <td colSpan={5} className="px-4 py-3 text-sm font-semibold text-gray-500">Total</td>
                <td className="px-4 py-3 text-right text-base font-bold text-gray-900">${totalRevenue.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
