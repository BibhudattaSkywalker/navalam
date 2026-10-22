import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, formatDate } from "@/lib/api";
import { BackLink, EmptyState, ErrorNote, FilterPills, FormCard, ImageField, LoadingBlock, PageTitle, Pagination, Panel, PrimaryLink, SaveButton, SearchField, StatusPill, fieldClass, tableHead, tdClass, thClass, usePagedList } from "@/admin/ui";

export function PostsAdmin() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const { data, loading, error, reload, pager } = usePagedList("/api/posts", { all: "1", q: query.trim(), status });
  const visible = data?.posts ?? [];

  async function remove(id) {
    if (!window.confirm("Delete this post?")) return;
    await api(`/api/admin/posts/${id}`, { method: "DELETE" });
    reload();
  }

  async function toggle(post) {
    const next = post.status === "published" ? "draft" : "published";
    await api(`/api/admin/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...post, status: next }),
    });
    reload();
  }

  return (
    <div>
      <PageTitle eyebrow="Stories" title="Blogs" description="Write, publish, and retire stories that appear on the public site." action={<PrimaryLink href="/admin/posts/new">New post</PrimaryLink>} />
      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <SearchField value={query} onChange={setQuery} placeholder="Search title, category, author" />
        <FilterPills value={status} onChange={setStatus} options={[{ value: "all", label: "All" }, { value: "published", label: "Published" }, { value: "draft", label: "Drafts" }]} />
      </div>
      <ErrorNote>{error}</ErrorNote>
      {loading ? <LoadingBlock /> : (
        <Panel>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead className={tableHead}>
                <tr>
                  <th className={thClass}>Title</th>
                  <th className={thClass}>Status</th>
                  <th className={thClass}>Updated</th>
                  <th className={thClass}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((post) => (
                  <tr key={post.id} className="border-t border-black/5 transition hover:bg-[#fbfaf6]">
                    <td className={tdClass}>
                      <Link to={`/admin/posts/${post.id}`} className="font-medium text-[#142017]">{post.title}</Link>
                      <p className="text-xs text-[#8a8478]">{post.category} · {post.author}</p>
                    </td>
                    <td className={tdClass}><StatusPill value={post.status} /></td>
                    <td className={tdClass}>{formatDate(post.updatedAt)}</td>
                    <td className={tdClass}>
                      <button type="button" className="mr-3 rounded-full bg-[#e7f4d4] px-3 py-1.5 text-xs font-medium text-[#3f6212]" onClick={() => toggle(post)}>{post.status === "published" ? "Unpublish" : "Publish"}</button>
                      <button type="button" className="rounded-full px-3 py-1.5 text-xs font-medium text-[#b42318] hover:bg-[#fee4e2]" onClick={() => remove(post.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {visible.length === 0 ? <EmptyState title="No posts match">Try another word, or clear the status filter.</EmptyState> : null}
          <Pagination {...pager} />
        </Panel>
      )}
    </div>
  );
}

export function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", image: "", category: "Update", author: "Nalvalam Foundation", status: "draft", seoTitle: "", seoDescription: "", publishedAt: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!id) return;
    api(`/api/admin/posts/${id}`)
      .then(({ post }) => setForm({ ...post, publishedAt: post.publishedAt ? String(post.publishedAt).slice(0, 16) : "" }))
      .catch((err) => setError(err.message));
  }, [id]);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const path = id ? `/api/admin/posts/${id}` : "/api/admin/posts";
      await api(path, { method: id ? "PUT" : "POST", body: JSON.stringify(form) });
      navigate("/admin/posts");
    } catch (err) {
      setError(err.message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
      <BackLink href="/admin/posts">All posts</BackLink>
      <PageTitle title={id ? "Edit post" : "New post"} description="A published post is visible on the blog and the homepage." />
      <FormCard>
        <label className="block text-sm font-medium">Title<input required value={form.title} onChange={(event) => set("title", event.target.value)} className={fieldClass} /></label>
        <label className="block text-sm font-medium">Slug<input value={form.slug} onChange={(event) => set("slug", event.target.value)} placeholder="Generated from the title if left blank" className={fieldClass} /></label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">Category<input value={form.category} onChange={(event) => set("category", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-medium">Author<input value={form.author} onChange={(event) => set("author", event.target.value)} className={fieldClass} /></label>
        </div>
        <label className="block text-sm font-medium">Excerpt<textarea value={form.excerpt} onChange={(event) => set("excerpt", event.target.value)} rows={3} className={`${fieldClass} h-auto py-3`} /></label>
        <label className="block text-sm font-medium">Content<textarea value={form.content} onChange={(event) => set("content", event.target.value)} rows={8} className={`${fieldClass} h-auto py-3`} /></label>
        <ImageField value={form.image} onChange={(value) => set("image", value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">SEO title<input value={form.seoTitle || ""} onChange={(event) => set("seoTitle", event.target.value)} className={fieldClass} /></label>
          <label className="block text-sm font-medium">Publish time<input type="datetime-local" value={form.publishedAt || ""} onChange={(event) => set("publishedAt", event.target.value)} className={fieldClass} /></label>
        </div>
        <label className="block text-sm font-medium">SEO description<textarea value={form.seoDescription || ""} onChange={(event) => set("seoDescription", event.target.value)} rows={2} className={`${fieldClass} h-auto py-3`} /></label>
        <label className="block text-sm font-medium">
          Status
          <select value={form.status} onChange={(event) => set("status", event.target.value)} className={fieldClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </label>
        <ErrorNote>{error}</ErrorNote>
        <SaveButton pending={pending}>Save post</SaveButton>
      </FormCard>
    </form>
  );
}
