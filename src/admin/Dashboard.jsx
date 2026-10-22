import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, inr } from "@/lib/api";
import { useCountUp } from "@/components/ui/CountUp";
import { LoadingBlock, StatusPill } from "@/admin/ui";

function StatCard({ label, value, hint, href, delay, money }) {
  const shown = useCountUp(value, true);
  return (
    <Link
      to={href}
      className="admin-rise group rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_32px_rgba(20,32,23,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(20,32,23,0.08)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm text-[#667085]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-poppins)] text-3xl text-[#142017]">{money ? inr(shown) : shown.toLocaleString("en-IN")}</p>
      <p className="mt-2 text-xs text-[#8a8478]">{hint}</p>
    </Link>
  );
}

function lastMonths(count) {
  const months = [];
  const now = new Date();
  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - index, 1);
    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: date.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return months;
}

function GiftChart({ donations }) {
  const [active, setActive] = useState(null);
  const months = lastMonths(6);
  const bars = months.map((month) => {
    const total = donations
      .filter((item) => item.status === "successful")
      .filter((item) => {
        const date = new Date(item.createdAt);
        return `${date.getFullYear()}-${date.getMonth()}` === month.key;
      })
      .reduce((sum, item) => sum + item.amount, 0);
    return { ...month, total };
  });
  const max = Math.max(...bars.map((bar) => bar.total), 1);

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_32px_rgba(20,32,23,0.04)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">Gifts received</h2>
          <p className="mt-1 text-sm text-[#667085]">Verified gifts across the last six months.</p>
        </div>
        <p className="text-sm font-medium text-[#80b230]">{active == null ? "Hover a month" : inr(bars[active].total)}</p>
      </div>
      <div className="mt-6 flex h-44 items-end gap-2 sm:gap-4">
        {bars.map((bar, index) => (
          <button
            key={bar.key}
            type="button"
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onBlur={() => setActive(null)}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="flex h-36 w-full items-end">
              <span
                className="admin-bar block w-full rounded-t-xl bg-gradient-to-t from-[#6e9c28] to-[#d7ec9a]"
                style={{ height: `${Math.max(6, (bar.total / max) * 100)}%`, animationDelay: `${index * 70}ms`, opacity: active == null || active === index ? 1 : 0.45 }}
              />
            </span>
            <span className="text-xs text-[#8a8478]">{bar.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SourceChart({ groups }) {
  const max = Math.max(...groups.map(([, count]) => count), 1);

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_32px_rgba(20,32,23,0.04)] sm:p-6">
      <h2 className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">Where leads come from</h2>
      <p className="mt-1 text-sm text-[#667085]">Each bar is a form on the public site.</p>
      {groups.length === 0 ? <p className="mt-8 text-sm text-[#8a8478]">Leads will appear here after the first enquiry.</p> : (
        <ul className="mt-6 space-y-4">
          {groups.map(([source, count], index) => (
            <li key={source}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="capitalize text-[#232222]">{source}</span>
                <span className="text-[#667085]">{count}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#f3f1eb]">
                <div className="admin-fill h-full rounded-full bg-[#f18405]" style={{ width: `${(count / max) * 100}%`, animationDelay: `${index * 80}ms` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CauseProgress({ causes }) {
  const active = causes.filter((cause) => cause.status !== "archived").slice(0, 5);
  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_32px_rgba(20,32,23,0.04)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">Cause progress</h2>
        <Link to="/admin/causes" className="text-sm text-[#80b230]">Manage</Link>
      </div>
      <ul className="mt-5 space-y-4">
        {active.map((cause, index) => {
          const progress = cause.goalAmount ? Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100)) : 0;
          return (
            <li key={cause.id}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <Link to={`/admin/causes/${cause.id}`} className="truncate font-medium text-[#142017]">{cause.title}</Link>
                <span className="shrink-0 text-[#667085]">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#f3f1eb]">
                <div className="admin-fill h-full rounded-full bg-[#80b230]" style={{ width: `${progress}%`, animationDelay: `${index * 70}ms` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/admin/summary")
      .then((summary) => setData({
        summary: summary.summary,
        recentLeads: summary.recentLeads,
        recentDonations: summary.recentDonations,
        causes: summary.causeProgress ?? [],
        activeCauses: summary.activeCauses ?? 0,
        leadSources: summary.leadSources ?? [],
        donations: summary.chartDonations ?? [],
      }))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-sm text-[#c2410c]">{error}</p>;
  if (!data) return <LoadingBlock />;

  const cards = [
    ["Published blogs", data.summary.published, `${data.summary.posts} stories in total`, "/admin/posts", false],
    ["New leads", data.summary.newLeads, `${data.summary.leads} enquiries overall`, "/admin/leads", false],
    ["Active causes", data.activeCauses, `${data.summary.causes} causes on record`, "/admin/causes", false],
    ["Gifts recorded", data.summary.raised, `${data.summary.donations} verified ${data.summary.donations === 1 ? "gift" : "gifts"}`, "/admin/donations", true],
  ];

  return (
    <div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#80b230]">Overview</p>
        <h1 className="font-[family-name:var(--font-poppins)] text-[1.75rem] text-[#142017] sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-[#667085]">Stories, enquiries, causes, and gifts in one place.</p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, hint, href, money], index) => (
          <StatCard key={label} label={label} value={value} hint={hint} href={href} money={money} delay={index * 60} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <GiftChart donations={data.donations} />
        <SourceChart groups={data.leadSources} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CauseProgress causes={data.causes} />
        <section className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_32px_rgba(20,32,23,0.04)] sm:p-6">
          <h2 className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">Latest activity</h2>
          <ul className="mt-4 divide-y divide-black/5 text-sm">
            {data.recentLeads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between gap-3 py-3">
                <Link to={`/admin/leads/${lead.id}`} className="min-w-0">
                  <span className="block truncate font-medium text-[#142017]">{lead.name || lead.email || "Untitled lead"}</span>
                  <span className="capitalize text-xs text-[#8a8478]">{lead.source}</span>
                </Link>
                <StatusPill value={lead.status} />
              </li>
            ))}
            {data.recentDonations.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                <Link to={`/admin/donations/${item.id}`} className="min-w-0">
                  <span className="block truncate font-medium text-[#142017]">{item.donorName}</span>
                  <span className="text-xs text-[#8a8478]">Donation</span>
                </Link>
                <span className="font-medium text-[#142017]">{inr(item.amount)}</span>
              </li>
            ))}
            {data.recentLeads.length + data.recentDonations.length === 0 ? <li className="py-6 text-[#8a8478]">Activity will show up as people write in and give.</li> : null}
          </ul>
        </section>
      </div>
    </div>
  );
}
