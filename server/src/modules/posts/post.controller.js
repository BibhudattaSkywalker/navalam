import { unauthorized } from "../../core/errors.js";
import * as posts from "./post.service.js";

/** Public listing. `?all=1` is the older admin spelling and still needs a session. */
export async function listPublic(req, res) {
  if (req.query.all === "1") {
    if (!req.user) throw unauthorized();
    return res.json(await posts.listAdminPosts(req.query));
  }
  res.json(await posts.listPublicPosts(req.query));
}

export async function getBySlug(req, res) {
  res.json({ post: await posts.findPostBySlug(req.params.slug, req.user) });
}

export async function listAdmin(req, res) {
  res.json(await posts.listAdminPosts(req.query));
}

export async function getById(req, res) {
  res.json({ post: await posts.findPostById(req.params.id) });
}

export async function create(req, res) {
  res.status(201).json({ post: await posts.createPost(req.body, req.user) });
}

export async function update(req, res) {
  res.json({ post: await posts.updatePost(req.params.id, req.body, req.user) });
}

export async function remove(req, res) {
  await posts.deletePost(req.params.id, req.user);
  res.json({ ok: true });
}
