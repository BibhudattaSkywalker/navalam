import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { CausesAdmin, CauseEditor } from "@/admin/CausesAdmin";
import { Dashboard } from "@/admin/Dashboard";
import { DonationsAdmin, DonationDetail } from "@/admin/DonationsAdmin";
import { LeadsAdmin, LeadDetail } from "@/admin/LeadsAdmin";
import { AuditAdmin, SettingsAdmin, TeamAdmin } from "@/admin/OfficeAdmin";
import { PostsAdmin, PostEditor } from "@/admin/PostsAdmin";
import "./admin.css";

const nav = [
  { href: "/admin", label: "Dashboard", end: true, icon: "grid" },
  { href: "/admin/posts", label: "Blogs", icon: "note" },
  { href: "/admin/leads", label: "Leads", icon: "inbox" },
  { href: "/admin/causes", label: "Our Causes", icon: "heart" },
  { href: "/admin/donations", label: "Donations", icon: "gift" },
  { href: "/admin/settings", label: "Settings", icon: "gear", role: "super_admin" },
  { href: "/admin/team", label: "Team", icon: "people", role: "super_admin" },
  { href: "/admin/audit", label: "Audit", icon: "clock", role: "super_admin" },
];

function Icon({ name }) {
  const paths = {
    grid: "M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z",
    note: "M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8 1.5V9h4.5",
    inbox: "M3 13l2-8h14l2 8v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6zm0 0h5l1 2h6l1-2h5",
    heart: "M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z",
    gift: "M4 10h16v10H4V10zm8-7c1.5 0 3 1.2 3 2.7C15 8 12 8 12 8s-3 0-3-2.3C9 4.2 10.5 3 12 3zM12 8v12",
    gear: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4 12h2M18 12h2M12 4v2M12 18v2",
    people: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3 19c.4-2.4 2.4-4 5-4s4.6 1.6 5 4M14 15c1.8 0 3.4 1 4 2.5",
    clock: "M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="admin-app grid min-h-screen bg-[#f6f4ee] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-[#16301c] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d7ec9a]">Nalvalam Foundation</p>
          <h1 className="mt-6 max-w-md font-[family-name:var(--font-poppins)] text-5xl leading-tight">Care, stories, and gifts in one desk.</h1>
        </div>
        <p className="max-w-sm text-sm leading-7 text-white/70">Publish updates, follow every enquiry, keep cause progress current, and see each donation with its receipt.</p>
      </section>
      <section className="admin-enter grid place-items-center px-5 py-12">
        <form onSubmit={onSubmit} className="w-full max-w-md rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_24px_60px_rgba(20,32,23,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#80b230]">Admin</p>
          <h1 className="mt-2 font-[family-name:var(--font-poppins)] text-3xl text-[#142017]">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-[#667085]">Use the local admin account to manage the foundation site.</p>
          <label className="mt-6 block text-sm font-medium text-[#232222]">
            Email
            <input name="email" type="email" required defaultValue="admin@nalvalam.local" className="mt-1.5 h-12 w-full rounded-xl border border-[#e4dfd4] bg-[#fffcf7] px-4 outline-none transition focus:border-[#80b230] focus:ring-2 focus:ring-[#80b230]/30" />
          </label>
          <label className="mt-4 block text-sm font-medium text-[#232222]">
            Password
            <input name="password" type="password" required defaultValue="Nalvalam@2026" className="mt-1.5 h-12 w-full rounded-xl border border-[#e4dfd4] bg-[#fffcf7] px-4 outline-none transition focus:border-[#80b230] focus:ring-2 focus:ring-[#80b230]/30" />
          </label>
          {error ? <p className="mt-3 text-sm text-[#c2410c]">{error}</p> : null}
          <button type="submit" disabled={pending} className="mt-6 h-12 w-full rounded-full bg-[#142017] font-medium text-white transition hover:bg-[#243528] disabled:opacity-60">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

function Sidebar({ open, onNavigate, role }) {
  const { pathname } = useLocation();
  const items = nav.filter((item) => !item.role || item.role === role);
  return (
    <aside className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-[80] flex w-[272px] flex-col bg-[#16301c] text-white shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 lg:shadow-none`}>
      <div className="px-6 pb-4 pt-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d7ec9a]">Nalvalam</p>
        <p className="mt-1 font-[family-name:var(--font-poppins)] text-2xl">Admin desk</p>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {items.map((item) => {
          const active = item.end ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${active ? "bg-white text-[#142017]" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link to="/" className="m-3 rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white">View website</Link>
    </aside>
  );
}

function sectionTitle(pathname) {
  if (pathname.startsWith("/admin/posts")) return "Blogs";
  if (pathname.startsWith("/admin/leads")) return "Leads";
  if (pathname.startsWith("/admin/causes")) return "Our Causes";
  if (pathname.startsWith("/admin/donations")) return "Donations";
  if (pathname.startsWith("/admin/settings")) return "Settings";
  if (pathname.startsWith("/admin/team")) return "Team";
  if (pathname.startsWith("/admin/audit")) return "Audit";
  return "Dashboard";
}

function Shell({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!user) {
    return (
      <main className="admin-app grid min-h-screen place-items-center bg-[#f6f4ee]">
        <div className="admin-skeleton h-12 w-40 rounded-full" />
      </main>
    );
  }

  const initials = user.name.split(" ").map((part) => part[0]).slice(0, 2).join("");

  return (
    <div className="admin-app min-h-screen bg-[#f6f4ee] text-[#1c2430] lg:grid lg:grid-cols-[272px_1fr]">
      <Sidebar open={open} role={user.role} onNavigate={() => setOpen(false)} />
      {open ? <button type="button" aria-label="Close menu" className="fixed inset-0 z-[70] bg-[#142017]/40 lg:hidden" onClick={() => setOpen(false)} /> : null}
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-black/5 bg-[#f6f4ee]/90 px-4 backdrop-blur sm:px-8 lg:z-20">
          <div className="flex items-center gap-3">
            <button type="button" className="rounded-full border border-[#e4dfd4] bg-white px-3 py-2 text-sm lg:hidden" onClick={() => setOpen(true)}>
              Menu
            </button>
            <p className="font-[family-name:var(--font-poppins)] text-sm text-[#142017]">{sectionTitle(pathname)}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden items-center gap-2 text-sm text-[#667085] sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#80b230] text-xs font-semibold text-white">{initials}</span>
              {user.name}
            </p>
            <button
              type="button"
              className="rounded-full border border-[#e4dfd4] bg-white px-4 py-2 text-sm transition hover:border-[#142017]"
              onClick={async () => {
                await api("/api/auth/logout", { method: "POST" });
                navigate("/admin/login");
              }}
            >
              Sign out
            </button>
          </div>
        </header>
        <div key={pathname} className="admin-enter px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Admin | Nalvalam Foundation";
  }, [pathname]);

  return (
    <Routes>
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<Shell><Dashboard /></Shell>} />
      <Route path="/admin/posts" element={<Shell><PostsAdmin /></Shell>} />
      <Route path="/admin/posts/new" element={<Shell><PostEditor /></Shell>} />
      <Route path="/admin/posts/:id" element={<Shell><PostEditor /></Shell>} />
      <Route path="/admin/leads" element={<Shell><LeadsAdmin /></Shell>} />
      <Route path="/admin/leads/:id" element={<Shell><LeadDetail /></Shell>} />
      <Route path="/admin/causes" element={<Shell><CausesAdmin /></Shell>} />
      <Route path="/admin/causes/new" element={<Shell><CauseEditor /></Shell>} />
      <Route path="/admin/causes/:id" element={<Shell><CauseEditor /></Shell>} />
      <Route path="/admin/donations" element={<Shell><DonationsAdmin /></Shell>} />
      <Route path="/admin/donations/:id" element={<Shell><DonationDetail /></Shell>} />
      <Route path="/admin/settings" element={<Shell><SettingsAdmin /></Shell>} />
      <Route path="/admin/team" element={<Shell><TeamAdmin /></Shell>} />
      <Route path="/admin/audit" element={<Shell><AuditAdmin /></Shell>} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
