import * as causes from "./cause.service.js";

export async function listPublic(req, res) {
  res.json(await causes.listPublicCauses(req.query));
}

export async function getBySlug(req, res) {
  res.json({ cause: await causes.findPublicCauseBySlug(req.params.slug) });
}

export async function listAdmin(req, res) {
  res.json(await causes.listAdminCauses(req.query));
}

export async function getById(req, res) {
  res.json({ cause: await causes.findCauseById(req.params.id) });
}

export async function create(req, res) {
  res.status(201).json({ cause: await causes.createCause(req.body, req.user) });
}

export async function update(req, res) {
  res.json({ cause: await causes.updateCause(req.params.id, req.body, req.user) });
}

export async function remove(req, res) {
  await causes.deleteCause(req.params.id, req.user);
  res.json({ ok: true });
}
