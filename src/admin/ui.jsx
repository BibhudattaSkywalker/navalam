import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export const fieldClass =
  "mt-1.5 h-11 w-full rounded-xl border border-[#e4dfd4] bg-[#fffcf7] px-3 text-sm text-[#232222] outline-none transition focus:border-[#80b230] focus:bg-white focus:ring-2 focus:ring-[#80b230]/30";

export function PageTitle({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#80b230]">{eyebrow}</p> : null}
        <h1 className="font-[family-name:var(--font-poppins)] text-[1.75rem] text-[#142017] sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm leading-6 text-[#667085]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PrimaryLink({ href, children }) {
  return (
    <Link to={href} className="inline-flex h-11 items-center rounded-full bg-[#142017] px-5 text-sm font-medium text-white transition hover:bg-[#243528]">
      {children}
    </Link>
  );
}

export function BackLink({ href, children }) {
  return (
    <Link to={href} className="mb-4 inline-flex items-center gap-2 text-sm text-[#667085] transition hover:text-[#142017]">
      <span aria-hidden="true">←</span>
      {children}
    </Link>
  );
}

export function SaveButton({ children, pending }) {
  return (
    <button type="submit" disabled={pending} className="h-11 rounded-full bg-[#80b230] px-6 text-sm font-medium text-white transition hover:bg-[#6e9c28] disabled:opacity-60">
      {pending ? "Saving…" : children}
    </button>
  );
}

export function StatusPill({ value }) {
  const tone = {
    published: "bg-[#e7f4d4] text-[#3f6212]",
    active: "bg-[#e7f4d4] text-[#3f6212]",
    paid: "bg-[#e7f4d4] text-[#3f6212]",
    successful: "bg-[#e7f4d4] text-[#3f6212]",
    refunded: "bg-[#e0f2fe] text-[#075985]",
    qualified: "bg-[#e7f4d4] text-[#3f6212]",
    completed: "bg-[#e7f3ea] text-[#166534]",
    contacted: "bg-[#fff1dc] text-[#9a3412]",
    new: "bg-[#fff4d6] text-[#92400e]",
    pending: "bg-[#fff4d6] text-[#92400e]",
    draft: "bg-[#f3f1eb] text-[#57534e]",
    paused: "bg-[#f3f1eb] text-[#57534e]",
    closed: "bg-[#f3f1eb] text-[#57534e]",
    failed: "bg-[#fee4e2] text-[#b42318]",
    archived: "bg-[#f3f1eb] text-[#57534e]",
  }[value] || "bg-[#f3f1eb] text-[#57534e]";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${tone}`}>{value}</span>;
}

export function Panel({ children }) {
  return <div className="mt-5 overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_12px_40px_rgba(20,32,23,0.05)]">{children}</div>;
}

export function FormCard({ children }) {
  return <div className="mt-2 space-y-4 rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_40px_rgba(20,32,23,0.05)] sm:p-8">{children}</div>;
}

export function SearchField({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-11 w-full rounded-full border border-[#e4dfd4] bg-white px-4 text-sm outline-none transition focus:border-[#80b230] focus:ring-2 focus:ring-[#80b230]/25 sm:max-w-xs"
    />
  );
}

export function FilterPills({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`h-9 rounded-full px-3.5 text-sm transition ${active ? "bg-[#142017] text-white" : "bg-white text-[#57534e] ring-1 ring-[#e4dfd4] hover:bg-[#f7f4ec]"}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function EmptyState({ title, children }) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">{title}</p>
      {children ? <p className="mt-1 text-sm text-[#667085]">{children}</p> : null}
    </div>
  );
}

export function LoadingBlock() {
  return <div className="admin-skeleton mt-6 h-48 rounded-3xl" />;
}

export function ErrorNote({ children }) {
  return children ? <p className="mt-4 text-sm text-[#c2410c]">{children}</p> : null;
}

export const tableHead = "bg-[#fbfaf6] text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#8a8478]";
export const thClass = "px-4 py-3 font-semibold";
export const tdClass = "px-4 py-3.5 align-middle";

export function ImageField({ value, onChange }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append("file", file);
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/admin/uploads", { method: "POST", body, credentials: "same-origin" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="text-sm font-medium">
      <span>Image</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="/uploads/photo.jpg" className={fieldClass} />
      <label className="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#d7d1c5] bg-[#fffcf7] px-4 py-6 text-center text-sm text-[#667085] transition hover:border-[#80b230]">
        <span>{pending ? "Uploading…" : "Choose an image"}</span>
        <span className="mt-1 text-xs">JPG, PNG, WEBP, or GIF up to 5 MB</span>
        <input type="file" accept="image/*" onChange={upload} className="sr-only" />
      </label>
      {value ? <img src={value} alt="" className="mt-3 h-32 w-full max-w-xs rounded-2xl object-cover" /> : null}
      {error ? <p className="mt-2 text-sm font-normal text-[#c2410c]">{error}</p> : null}
    </div>
  );
}

export const PAGE_SIZES = [10, 20, 50, 100];
const SIZE_KEY = "admin.pageSize";

function storedPageSize(fallback) {
  try {
    const saved = Number(window.localStorage.getItem(SIZE_KEY));
    return PAGE_SIZES.includes(saved) ? saved : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Server-side paging for an admin list. Returns `pager`, ready to spread onto <Pagination />.
 * The chosen page size is remembered across lists and visits.
 */
export function usePagedList(url, params = {}, defaultSize = 10) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(() => storedPageSize(defaultSize));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);
  const signature = JSON.stringify(params);
  const [settled, setSettled] = useState(signature);

  useEffect(() => {
    const timer = setTimeout(() => setSettled(signature), 300);
    return () => clearTimeout(timer);
  }, [signature]);

  useEffect(() => {
    setPage(1);
  }, [settled]);

  useEffect(() => {
    let cancelled = false;
    const query = new URLSearchParams({ page, limit: pageSize });
    Object.entries(JSON.parse(settled)).forEach(([key, value]) => {
      if (value && value !== "all") query.set(key, value);
    });
    setLoading(true);
    api(`${url}?${query}`)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError("");
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [url, page, settled, pageSize, tick]);

  function changePageSize(size) {
    setPageSize(size);
    setPage(1);
    try {
      window.localStorage.setItem(SIZE_KEY, String(size));
    } catch {
      /* private mode: the choice just will not persist */
    }
  }

  return {
    data,
    page,
    setPage,
    loading,
    error,
    setError,
    pagination: data?.pagination,
    reload: () => setTick((value) => value + 1),
    pager: { pagination: data?.pagination, onPage: setPage, pageSize, onPageSize: changePageSize },
  };
}

function pageWindow(page, totalPages) {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((value, index) => {
    if (index && value - sorted[index - 1] > 1) result.push("…");
    result.push(value);
  });
  return result;
}

export function Pagination({ pagination, onPage, pageSize, onPageSize }) {
  if (!pagination || pagination.total === 0) return null;
  const { page, limit, total, totalPages } = pagination;
  const from = (page - 1) * limit + 1;
  const to = Math.min(total, page * limit);
  const button = "h-9 min-w-9 rounded-full px-3 text-sm transition disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-black/5 px-4 py-3 text-sm text-[#667085] sm:flex-row">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p>Showing {from}–{to} of {total}</p>
        {onPageSize ? (
          <label className="flex items-center gap-2">
            Rows per page
            <select
              value={pageSize}
              onChange={(event) => onPageSize(Number(event.target.value))}
              className="h-9 rounded-full border border-[#e4dfd4] bg-white px-3 text-sm text-[#232222] outline-none focus:border-[#80b230]"
            >
              {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
          </label>
        ) : null}
      </div>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button type="button" className={`${button} ring-1 ring-[#e4dfd4] hover:bg-[#f7f4ec]`} disabled={!pagination.hasPrev} onClick={() => onPage(page - 1)}>Previous</button>
        {pageWindow(page, totalPages).map((item, index) => (
          item === "…"
            ? <span key={`gap-${index}`} className="px-1">…</span>
            : (
              <button key={item} type="button" onClick={() => onPage(item)} aria-current={item === page ? "page" : undefined}
                className={`${button} ${item === page ? "bg-[#142017] text-white" : "ring-1 ring-[#e4dfd4] hover:bg-[#f7f4ec]"}`}>
                {item}
              </button>
            )
        ))}
        <button type="button" className={`${button} ring-1 ring-[#e4dfd4] hover:bg-[#f7f4ec]`} disabled={!pagination.hasNext} onClick={() => onPage(page + 1)}>Next</button>
      </nav>
    </div>
  );
}
