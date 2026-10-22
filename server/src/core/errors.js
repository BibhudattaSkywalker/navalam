/** An error that is safe to show to the client, carrying its HTTP status. */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export const badRequest = (message = "Invalid request.") => new HttpError(400, message);
export const unauthorized = (message = "Sign in required.") => new HttpError(401, message);
export const forbidden = (message = "You do not have permission for this action.") => new HttpError(403, message);
export const notFound = (message = "Not found.") => new HttpError(404, message);
export const conflict = (message = "That value is already in use.") => new HttpError(409, message);
