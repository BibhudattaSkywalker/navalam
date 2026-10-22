import mongoose from "mongoose";
import { ROLES, values } from "../../config/constants.js";
import { clientJson } from "../../core/clientJson.js";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: values(ROLES), default: ROLES.CONTENT_MANAGER },
  },
  { timestamps: true },
);

userSchema.plugin(clientJson);

export const User = mongoose.model("User", userSchema);
