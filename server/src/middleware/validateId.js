import mongoose from "mongoose";
import { notFound } from "../core/errors.js";

/** Short-circuits with a 404 when a route param cannot be a Mongo ObjectId. */
export function validateId(param = "id") {
  return (req, _res, next) => {
    const value = req.params[param];
    next(mongoose.isValidObjectId(value) && String(value).length === 24 ? undefined : notFound());
  };
}
