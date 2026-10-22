import * as leads from "./lead.service.js";

export async function submit(req, res) {
  const lead = await leads.createLead(req.body);
  res.status(201).json({ lead: { id: lead.id } });
}

export async function list(req, res) {
  res.json(await leads.listLeads(req.query));
}

export async function getById(req, res) {
  res.json({ lead: await leads.findLeadById(req.params.id) });
}

export async function update(req, res) {
  res.json({ lead: await leads.updateLead(req.params.id, req.body, req.user) });
}

export async function remove(req, res) {
  await leads.deleteLead(req.params.id, req.user);
  res.json({ ok: true });
}

export async function exportCsv(_req, res) {
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.send(await leads.exportLeadsCsv());
}
