import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

// Mongo drops expired sessions on its own, so the collection never grows unbounded.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
sessionSchema.index({ userId: 1 });

export const Session = mongoose.model("Session", sessionSchema);
