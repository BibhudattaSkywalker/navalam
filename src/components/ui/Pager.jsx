function pageWindow(page, totalPages) {
  const sorted = [...new Set([1, totalPages, page - 1, page, page + 1])]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
  const result = [];
  sorted.forEach((value, index) => {
    if (index && value - sorted[index - 1] > 1) result.push("…");
    result.push(value);
  });
  return result;
}

/** Public-site pager. `pagination` is the object returned by the list APIs. */
export function Pager({ pagination, onPage, className = "" }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages } = pagination;
  const base =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-4 font-[family-name:var(--font-lato)] text-sm transition disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <nav aria-label="Pagination" className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      <button type="button" className={`${base} border border-[#d9d9d9] bg-white text-[#232222] hover:border-green`} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </button>
      {pageWindow(page, totalPages).map((item, index) =>
        item === "…" ? (
          <span key={`gap-${index}`} className="px-1 text-[#8d8d8d]">…</span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPage(item)}
            className={`${base} ${item === page ? "gradient-orange text-white" : "border border-[#d9d9d9] bg-white text-[#232222] hover:border-green"}`}
          >
            {item}
          </button>
        ),
      )}
      <button type="button" className={`${base} border border-[#d9d9d9] bg-white text-[#232222] hover:border-green`} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </nav>
  );
}
