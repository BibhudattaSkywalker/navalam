import { HttpError } from "../core/errors.js";
import { logger } from "../core/logger.js";

/** Turns the errors libraries throw into the plain `{ error }` payload the clients read. */
function describe(error) {
  if (error instanceof HttpError) return { status: error.status, message: error.message };
  if (error?.code === 11000) return { status: 409, message: "That name or address is already in use." };
  if (error?.name === "ValidationError") {
    const first = Object.values(error.errors || {})[0];
    return { status: 400, message: first?.message || "Some fields are invalid." };
  }
  if (error?.name === "CastError") return { status: 400, message: `Invalid ${error.path || "value"}.` };
  if (error?.type === "entity.parse.failed") return { status: 400, message: "The request body is not valid JSON." };
  if (error?.type === "entity.too.large") return { status: 413, message: "The request body is too large." };
  if (error?.name === "MulterError") {
    const message = error.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller." : "Upload failed.";
    return { status: 400, message };
  }
  return { status: 500, message: "Something went wrong." };
}

// Express recognises error middleware by its four arguments, so _next must stay.
export function errorHandler(error, req, res, _next) {
  const { status, message } = describe(error);
  if (status >= 500) logger.error(`${req.method} ${req.originalUrl}`, error);
  if (res.headersSent) return;
  res.status(status).json({ error: message });
}

export function apiNotFound(_req, res) {
  res.status(404).json({ error: "Not found." });
}
