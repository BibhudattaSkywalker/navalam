import { badRequest } from "../../core/errors.js";

export function saveImage(req, res) {
  if (!req.file) throw badRequest("Choose an image.");
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
}
