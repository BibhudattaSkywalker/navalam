import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, formatDate, inr } from "@/lib/api";
import { BackLink, EmptyState, ErrorNote, FilterPills, FormCard, LoadingBlock, PageTitle, Pagination, Panel, SearchField, StatusPill, fieldClass, tableHead, tdClass, thClass, usePagedList } from "@/admin/ui";

export function DonationsAdmin() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const { data, loading, error, pager } = usePagedList("/api/admin/donations", { q: query.trim(), status, type });
  const visible = data?.donations ?? [];
  const total = data?.raised ?? 0;

  return (
    <div>
      <PageTitle eyebrow="Giving" title="Donations" description="Donor details, amounts, payment status, and transaction IDs." />
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchField value={query} onChange={setQuery} placeholder="Search donor, email, transaction" />
          <p className="text-sm text-[#667085]">Verified total for this filter: <span className="font-medium text-[#142017]">{inr(total)}</span></p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <FilterPills value={status} onChange={setStatus} options={[{ value: "all", label: "All statuses" }, { value: "successful", label: "Successful" }, { value: "pending", label: "Pending" }, { value: "failed", label: "Failed" }, { value: "refunded", label: "Refunded" }]} />
          <FilterPills value={type} onChange={setType} options={[{ value: "all", label: "All types" }, { value: "one-time", label: "One-time" }, { value: "monthly", label: "Monthly" }]} />
        </div>
      </div>
      <ErrorNote>{error}</ErrorNote>
      {loading ? <LoadingBlock /> : (
        <Panel>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full text-sm">
              <thead className={tableHead}>
                <tr>
                  <th className={thClass}>Donor</th>
                  <th className={thClass}>Amount</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Transaction</th>
                  <th className={thClass}>Date</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item) => (
                  <tr key={item.id} className="border-t border-black/5 transition hover:bg-[#fbfaf6]">
                    <td className={tdClass}>
                      <Link to={`/admin/donations/${item.id}`} className="font-medium text-[#142017]">{item.donorName}</Link>
                      <p className="text-xs capitalize text-[#8a8478]">{item.type} · {item.method}{item.cause ? ` · ${item.cause.title}` : ""}</p>
                    </td>
                    <td className={tdClass}>{inr(item.amount)}</td>
                    <td className={tdClass}><StatusPill value={item.status} /></td>
                    <td className={tdClass}>{item.transactionId || item.orderReference || "—"}</td>
                    <td className={tdClass}>{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visible.length === 0 ? <EmptyState title="No donations match">Gifts from the donate pages will appear here.</EmptyState> : null}
          <Pagination {...pager} />
        </Panel>
      )}
    </div>
  );
}

export function DonationDetail() {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    api(`/api/admin/donations/${id}`)
      .then((data) => {
        setDonation(data.donation);
        setHistory(data.history);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  async function updateStatus(status) {
    setNotice("");
    try {
      const data = await api(`/api/admin/donations/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      setDonation((current) => ({ ...current, ...data.donation }));
    } catch (err) {
      setNotice(err.message);
    }
  }

  if (error) return <ErrorNote>{error}</ErrorNote>;
  if (!donation) return <LoadingBlock />;

  return (
    <div className="mx-auto max-w-3xl">
      <BackLink href="/admin/donations">All donations</BackLink>
      <PageTitle title={inr(donation.amount)} description={`${donation.donorName} · ${donation.type}`} />
      <FormCard>
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p><span className="text-[#8a8478]">Email</span><br />{donation.email || "—"}</p>
          <p><span className="text-[#8a8478]">Phone</span><br />{donation.phone || "—"}</p>
          <p><span className="text-[#8a8478]">Method</span><br />{donation.method}</p>
          <p><span className="text-[#8a8478]">Transaction</span><br />{donation.transactionId || donation.orderReference || "—"}</p>
          <p><span className="text-[#8a8478]">Date</span><br />{formatDate(donation.paidAt || donation.createdAt)}</p>
          <p><span className="text-[#8a8478]">Cause</span><br />{donation.cause?.title || "General fund"}</p>
        </div>
        <label className="block text-sm font-medium">
          Payment status
          <select value={donation.status} onChange={(event) => updateStatus(event.target.value)} className={fieldClass}>
            <option value={donation.status}>{donation.status}</option>
            {donation.status === "pending" ? <option value="failed">Failed</option> : null}
            {donation.status === "successful" ? <option value="refunded">Refunded</option> : null}
          </select>
          <p className="mt-2 text-xs font-normal text-[#8a8478]">Successful is set only after Razorpay verifies the payment. Refunds are sent back through Razorpay.</p>
          {notice ? <p className="mt-2 text-sm text-[#c2410c]">{notice}</p> : null}
        </label>
      </FormCard>
      <section className="mt-4 rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_40px_rgba(20,32,23,0.05)]">
        <h2 className="font-[family-name:var(--font-poppins)] text-lg text-[#142017]">Donor history</h2>
        <ul className="mt-3 divide-y divide-black/5 text-sm">
          {history.map((item) => (
            <li key={item.id} className="flex justify-between gap-3 py-3">
              <span>{formatDate(item.createdAt)} · {item.transactionId || "No transaction"}</span>
              <span className="font-medium">{inr(item.amount)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
