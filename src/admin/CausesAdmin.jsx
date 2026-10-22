import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, apiCredentials, apiUrl, inr } from "@/lib/api";
import { BackLink, EmptyState, ErrorNote, FilterPills, FormCard, ImageField, LoadingBlock, PageTitle, Pagination, Panel, PrimaryLink, SaveButton, SearchField, StatusPill, fieldClass, tableHead, tdClass, thClass, usePagedList } from "@/admin/ui";

export function CausesAdmin() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const { data, loading, error, reload, pager } = usePagedList("/api/admin/causes", { q: query.trim(), status });
  const visible = data?.causes ?? [];

  async function remove(id) {
    if (!window.confirm("Delete this cause?")) return;
    await api(`/api/admin/causes/${id}`, { method: "DELETE" });
    reload();
  }

  return (
    <div>
      <PageTitle eyebrow="Programs" title="Our Causes" description="Update titles, images, goals, and the amount already raised." action={<PrimaryLink href="/admin/causes/new">New cause</PrimaryLink>} />
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchField value={query} onChange={setQuery} placeholder="Search causes" />
        <FilterPills value={status} onChange={setStatus} options={[{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "paused", label: "Paused" }, { value: "completed", label: "Completed" }, { value: "archived", label: "Archived" }]} />
      </div>
      <ErrorNote>{error}</ErrorNote>
      {loading ? <LoadingBlock /> : (
        <Panel>
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-sm">
              <thead className={tableHead}>
                <tr>
                  <th className={thClass}>Cause</th>
                  <th className={thClass}>Progress</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((cause) => {
                  const progress = cause.goalAmount ? Math.min(100, Math.round((cause.raisedAmount / cause.goalAmount) * 100)) : 0;
                  return (
                    <tr key={cause.id} className="border-t border-black/5 transition hover:bg-[#fbfaf6]">
                      <td className={tdClass}>
                        <Link to={`/admin/causes/${cause.id}`} className="font-medium text-[#142017]">{cause.title}</Link>
                        <p className="text-xs text-[#8a8478]">{inr(cause.raisedAmount)} of {inr(cause.goalAmount)}</p>
                      </td>
                      <td className={tdClass}>
                        <div className="h-1.5 w-36 overflow-hidden rounded-full bg-[#f3f1eb]">
                          <div className="h-full rounded-full bg-[#80b230]" style={{ width: `${progress}%` }} />
                        </div>
                        <p className="mt-1 text-xs text-[#8a8478]">{progress}%</p>
                      </td>
                      <td className={tdClass}><StatusPill value={cause.status} /></td>
                      <td className={`${tdClass} text-right`}>
                        <button type="button" className="rounded-full px-3 py-1.5 text-xs font-medium text-[#b42318] hover:bg-[#fee4e2]" onClick={() => remove(cause.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {visible.length === 0 ? <EmptyState title="No causes match">Create a cause or clear the filter.</EmptyState> : null}
          <Pagination {...pager} />
        </Panel>
      )}
    </div>
  );
}

const empty = { title: "", slug: "", summary: "", description: "", image: "", goalAmount: 0, raisedAmount: 0, status: "active" };

export function CauseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!id) return;
    api(`/api/admin/causes/${id}`)
      .then(({ cause }) => setForm(cause))
      .catch((err) => setError(err.message));
  }, [id]);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    try {
      const path = id ? `/api/admin/causes/${id}` : "/api/admin/causes";
      await api(path, { method: id ? "PUT" : "POST", body: JSON.stringify(form) });
      navigate("/admin/causes");
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
      <BackLink href="/admin/causes">All causes</BackLink>
      <PageTitle title={id ? "Edit cause" : "New cause"} description="Goal and raised amounts appear as progress on the public causes page." />
      <FormCard>
        <label className="block text-sm font-medium">Title<input required value={form.title} onChange={(event) => set("title", event.target.value)} className={fieldClass} /></label>
        <label className="block text-sm font-medium">Slug<input value={form.slug || ""} onChange={(event) => set("slug", event.target.value)} className={fieldClass} /></label>
        <label className="block text-sm font-medium">Summary<textarea value={form.summary} onChange={(event) => set("summary", event.target.value)} rows={3} className={`${fieldClass} h-auto py-3`} /></label>
        <label className="block text-sm font-medium">Description<textarea value={form.description} onChange={(event) => set("description", event.target.value)} rows={7} className={`${fieldClass} h-auto py-3`} /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Goal (₹)<input type="number" min="0" value={form.goalAmount} onChange={(event) => set("goalAmount", Number(event.target.value))} className={fieldClass} /></label>
          <label className="block text-sm font-medium">Raised (₹)<input type="number" min="0" value={form.raisedAmount} onChange={(event) => set("raisedAmount", Number(event.target.value))} className={fieldClass} /></label>
        </div>
        <ImageField value={form.image || ""} onChange={(value) => set("image", value)} />
        <div className="text-sm font-medium">
          Gallery
          <div className="mt-2 flex flex-wrap gap-2">
            {(form.gallery || []).map((url) => (
              <button type="button" key={url} onClick={() => set("gallery", form.gallery.filter((item) => item !== url))} className="text-xs text-[#b42318]">
                <img src={url} alt="" className="h-16 w-24 rounded-lg object-cover" />
                Remove
              </button>
            ))}
          </div>
          <input type="file" accept="image/*" className="mt-2 block text-sm" onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const body = new FormData();
            body.append("file", file);
            const response = await fetch(apiUrl("/api/admin/uploads"), { method: "POST", body, credentials: apiCredentials });
            const data = await response.json();
            if (response.ok) set("gallery", [...(form.gallery || []), data.url]);
          }} />
        </div>
        <label className="block text-sm font-medium">
          Status
          <select value={form.status} onChange={(event) => set("status", event.target.value)} className={fieldClass}>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <ErrorNote>{error}</ErrorNote>
        <SaveButton pending={pending}>Save cause</SaveButton>
      </FormCard>
    </form>
  );
}
