import { POST_STATUS, values } from "../../config/constants.js";
import { badRequest, notFound } from "../../core/errors.js";
import { paginate } from "../../core/pagination.js";
import { anyFieldMatches, clean, oneOf, slugify } from "../../core/text.js";
import { recordAudit } from "../audit/audit.service.js";
import { Post } from "./post.model.js";

const SEARCH_FIELDS = ["title", "category", "author"];

/** Published posts, plus scheduled posts whose time has come. */
function liveFilter(now = new Date()) {
  return {
    $or: [
      { status: POST_STATUS.PUBLISHED, publishedAt: null },
      { status: POST_STATUS.PUBLISHED, publishedAt: { $lte: now } },
      { status: POST_STATUS.SCHEDULED, publishedAt: { $lte: now } },
    ],
  };
}

function isLive(post, now = new Date()) {
  if (post.status === POST_STATUS.PUBLISHED) return !post.publishedAt || post.publishedAt <= now;
  if (post.status === POST_STATUS.SCHEDULED) return Boolean(post.publishedAt) && post.publishedAt <= now;
  return false;
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Merges the incoming fields over the stored post (if any) into a clean document. */
function buildPostData(input = {}, existing = null) {
  const title = clean(input.title || existing?.title, 200);
  if (!title) throw badRequest("Add a title.");

  const status = oneOf(input.status, values(POST_STATUS), existing?.status || POST_STATUS.DRAFT);
  const publishedAt = input.publishedAt
    ? parseDate(input.publishedAt)
    : status === POST_STATUS.PUBLISHED ? existing?.publishedAt || new Date() : null;

  return {
    title,
    slug: slugify(input.slug || existing?.slug || title) || `post-${Date.now()}`,
    excerpt: String(input.excerpt ?? existing?.excerpt ?? ""),
    content: String(input.content ?? existing?.content ?? ""),
    image: String(input.image ?? existing?.image ?? ""),
    category: String(input.category || existing?.category || "Update"),
    author: String(input.author || existing?.author || "Nalvalam Foundation"),
    status,
    publishedAt,
    seoTitle: String(input.seoTitle ?? existing?.seoTitle ?? ""),
    seoDescription: String(input.seoDescription ?? existing?.seoDescription ?? ""),
  };
}

export async function listPublicPosts(query) {
  const { docs, pagination } = await paginate(Post, liveFilter(), query, {
    sort: { publishedAt: -1, createdAt: -1 },
  });
  return { posts: docs, pagination };
}

export async function listAdminPosts(query) {
  const filter = {};
  if (query.status) filter.status = String(query.status);
  if (query.q) filter.$or = anyFieldMatches(SEARCH_FIELDS, query.q);
  const { docs, pagination } = await paginate(Post, filter, query);
  return { posts: docs, pagination };
}

/** Drafts and scheduled posts stay hidden unless the viewer is signed in. */
export async function findPostBySlug(slug, viewer) {
  const post = await Post.findOne({ slug });
  if (!post || (!viewer && !isLive(post))) throw notFound("Post not found.");
  return post;
}

export async function findPostById(id) {
  const post = await Post.findById(id);
  if (!post) throw notFound("Post not found.");
  return post;
}

export async function createPost(input, actor) {
  const post = await Post.create(buildPostData(input));
  await recordAudit(actor, "create", "blog", post._id, post.title);
  return post;
}

export async function updatePost(id, input, actor) {
  const existing = await findPostById(id);
  const post = await Post.findByIdAndUpdate(id, buildPostData(input, existing), { returnDocument: "after" });
  await recordAudit(actor, "update", "blog", post._id, post.title);
  return post;
}

export async function deletePost(id, actor) {
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw notFound("Post not found.");
  await recordAudit(actor, "delete", "blog", post._id, post.title);
}
