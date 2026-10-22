import { getDashboard } from "./dashboard.service.js";

export async function overview(_req, res) {
  res.json(await getDashboard());
}
