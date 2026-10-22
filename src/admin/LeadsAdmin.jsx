import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, formatDate } from "@/lib/api";
import { BackLink, EmptyState, ErrorNote, FilterPills, FormCard, LoadingBlock, PageTitle, Pagination, Panel, SearchField, StatusPill, fieldClass, tableHead, tdClass, thClass, usePagedList } from "@/admin/ui";

export function LeadsAdmin() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const { data, loading, error, pager } = usePagedList("/api/admin/leads", { q: query.trim(), status, source });
  const visible = data?.leads ?? [];
  const sources = ["all", ...(data?.sources ?? [])];

  return (
    <div>
      <PageTitle eyebrow="Enquiries" title="Leads" description="Every form on the site lands here with its source, contact details, and status." action={<a href="/api/admin/leads/export" className="inline-flex h-11 items-center rounded-full border border-[#e4dfd4] bg-white px-5 text-sm">Export CSV</a>} />
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchField value={query} onChange={setQuery} placeholder="Search name, email, phone" />
          <label className="text-sm text-[#667085]">
            Source
            <select value={source} onChange={(event) => setSource(event.target.value)} className="ml-2 h-11 rounded-full border border-[#e4dfd4] bg-white px-3 capitalize text-[#232222] outline-none">
              {sources.map((item) => <option key={item} value={item}>{item === "all" ? "All sources" : item}</option>)}
            </select>
          </label>
        </div>
        <FilterPills value={status} onChange={setStatus} options={[{ value: "all", label: "All" }, { value: "new", label: "New" }, { value: "contacted", label: "Contacted" }, { value: "qualified", label: "Qualified" }, { value: "closed", label: "Closed" }]} />
      </div>
      <ErrorNote>{error}</ErrorNote>
      {loading ? <LoadingBlock /> : (
        <Panel>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead className={tableHead}>
                <tr>
                  <th className={thClass}>Contact</th>
                  <th className={thClass}>Source</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Date</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((lead) => (
                  <tr key={lead.id} className="border-t border-black/5 transition hover:bg-[#fbfaf6]">
                    <td className={tdClass}>
                      <Link to={`/admin/leads/${lead.id}`} className="font-medium text-[#142017]">{lead.name || "No name"}</Link>
                      <p className="text-xs text-[#8a8478]">{lead.email || lead.phone || lead.subject}</p>
                    </td>
                    <td className={`${tdClass} capitalize`}>{lead.source}</td>
                    <td className={tdClass}><StatusPill value={lead.status} /></td>
                    <td className={tdClass}>{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visible.length === 0 ? <EmptyState title="No leads match">New enquiries from the website will show up in this list.</EmptyState> : null}
          <Pagination {...pager} />
        </Panel>
      )}
    </div>
  );
}

export function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/api/admin/leads/${id}`).then((data) => setLead(data.lead)).catch((err) => setError(err.message));
  }, [id]);

  async function updateStatus(status) {
    const data = await api(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, assignee: lead.assignee, notes: lead.notes }),
    });
    setLead(data.lead);
  }

  async function remove() {
    if (!window.confirm("Delete this lead?")) return;
    await api(`/api/admin/leads/${id}`, { method: "DELETE" });
    navigate("/admin/leads");
  }

  if (error) return <ErrorNote>{error}</ErrorNote>;
  if (!lead) return <LoadingBlock />;
  const details = JSON.parse(lead.details || "{}");

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink href="/admin/leads">All leads</BackLink>
      <PageTitle title={lead.name || "Lead"} description={`${lead.source} · ${formatDate(lead.createdAt)}`} />
      <FormCard>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p><span className="text-[#8a8478]">Email</span><br />{lead.email || "—"}</p>
          <p><span className="text-[#8a8478]">Phone</span><br />{lead.phone || "—"}</p>
        </div>
        {lead.subject ? <p className="text-sm"><span className="font-medium">Subject:</span> {lead.subject}</p> : null}
        {lead.message ? <p className="rounded-2xl bg-[#fbfaf6] p-4 text-sm leading-7">{lead.message}</p> : null}
        <label className="block text-sm font-medium">
          Assigned to
          <input value={lead.assignee || ""} onChange={(event) => setLead({ ...lead, assignee: event.target.value })} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium">
          Notes
          <textarea value={lead.notes || ""} onChange={(event) => setLead({ ...lead, notes: event.target.value })} rows={4} className={`${fieldClass} h-auto py-3`} />
        </label>
        <button type="button" className="h-11 rounded-full bg-[#142017] px-5 text-sm text-white" onClick={() => updateStatus(lead.status)}>Save lead</button>
        <label className="block text-sm font-medium">
          Status
          <select value={lead.status} onChange={(event) => updateStatus(event.target.value)} className={fieldClass}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        {Object.keys(details).length ? (
          <dl className="grid gap-2 text-sm">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="grid gap-1 border-t border-black/5 py-2 sm:grid-cols-[180px_1fr]">
                <dt className="text-[#8a8478]">{key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <button type="button" onClick={remove} className="text-sm font-medium text-[#b42318]">Delete lead</button>
      </FormCard>
    </div>
  );
}
