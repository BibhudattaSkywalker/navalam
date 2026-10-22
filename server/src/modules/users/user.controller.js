import { createUser, listUsers } from "./user.service.js";

export async function list(req, res) {
  res.json(await listUsers(req.query));
}

export async function create(req, res) {
  res.status(201).json({ user: await createUser(req.body, req.user) });
}
