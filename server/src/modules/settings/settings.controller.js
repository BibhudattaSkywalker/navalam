import * as settings from "./settings.service.js";

export async function get(_req, res) {
  res.json({ settings: await settings.getSettings() });
}

export async function update(req, res) {
  res.json({ settings: await settings.updateSettings(req.body, req.user) });
}
