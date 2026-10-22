import { useEffect, useState } from "react";
import { api, formatDate } from "@/lib/api";
import { ErrorNote, FormCard, LoadingBlock, PageTitle, Pagination, Panel, SaveButton, fieldClass, tableHead, tdClass, thClass, usePagedList } from "@/admin/ui";

export function SettingsAdmin() {
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    api("/api/admin/settings").then((data) => setForm(data.settings)).catch((err) => setError(err.message));
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const data = await api("/api/admin/settings", { method: "PUT", body: JSON.stringify(form) });
      setForm(data.settings);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  if (!form) return error ? <ErrorNote>{error}</ErrorNote> : <LoadingBlock />;
  const fields = [
    ["contactEmail", "Contact email"],
    ["phone", "Phone"],
    ["address", "Address"],
    ["facebook", "Facebook"],
    ["instagram", "Instagram"],
    ["twitter", "Twitter"],
    ["youtube", "YouTube"],
  ];

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Website" title="Settings" description="Contact details and social links stored for the site." />
      <FormCard>
        {fields.map(([key, label]) => (
          <label key={key} className="block text-sm font-medium">
            {label}
            <input value={form[key] || ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className={fieldClass} />
          </label>
        ))}
        <ErrorNote>{error}</ErrorNote>
        <SaveButton pending={pending}>Save settings</SaveButton>
      </FormCard>
    </form>
  );
}

export function TeamAdmin() {
  const [error, setError] = useState("");
  const { data, reload: load, error: listError, pager } = usePagedList("/api/admin/users");
  const users = data?.users ?? [];

  async function onSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    try {
      await api("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password"),
          role: form.get("role"),
        }),
      });
      event.currentTarget.reset();
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle eyebrow="Access" title="Team" description="Super admins can add a content manager. Passwords are stored only as a hash." />
      <FormCard>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Name<input required name="name" className={fieldClass} /></label>
          <label className="block text-sm font-medium">Email<input required type="email" name="email" className={fieldClass} /></label>
          <label className="block text-sm font-medium">Password<input required type="password" name="password" minLength={8} className={fieldClass} /></label>
          <label className="block text-sm font-medium">Role
            <select name="role" className={fieldClass} defaultValue="content_manager">
              <option value="content_manager">Content manager</option>
              <option value="super_admin">Super admin</option>
            </select>
          </label>
          <ErrorNote>{error}</ErrorNote>
          <SaveButton>Add teammate</SaveButton>
        </form>
      </FormCard>
      <Panel>
        <table className="min-w-full text-sm">
          <thead className={tableHead}><tr><th className={thClass}>Name</th><th className={thClass}>Email</th><th className={thClass}>Role</th></tr></thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-black/5">
                <td className={tdClass}>{user.name}</td>
                <td className={tdClass}>{user.email}</td>
                <td className={`${tdClass} capitalize`}>{user.role.replaceAll("_", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination {...pager} />
      </Panel>
      <ErrorNote>{listError}</ErrorNote>
    </div>
  );
}

export function AuditAdmin() {
  const { data, error, pager } = usePagedList("/api/admin/audit", {}, 20);
  const logs = data?.logs;

  if (error) return <ErrorNote>{error}</ErrorNote>;
  if (!logs) return <LoadingBlock />;

  return (
    <div>
      <PageTitle eyebrow="Accountability" title="Audit history" description="Sign-ins and changes to blogs, causes, leads, donations, settings, and team accounts." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm">
            <thead className={tableHead}>
              <tr><th className={thClass}>When</th><th className={thClass}>Who</th><th className={thClass}>Action</th><th className={thClass}>Detail</th></tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-black/5">
                  <td className={tdClass}>{formatDate(log.createdAt)}</td>
                  <td className={tdClass}>{log.actorEmail}</td>
                  <td className={`${tdClass} capitalize`}>{log.action} {log.entity}</td>
                  <td className={tdClass}>{log.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination {...pager} />
      </Panel>
    </div>
  );
}
