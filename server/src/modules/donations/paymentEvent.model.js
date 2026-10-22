import mongoose from "mongoose";
import { clientJson } from "../../core/clientJson.js";

/** One row per gateway notification we acted on, keyed by the gateway's event id. */
const paymentEventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    donationId: { type: mongoose.Schema.Types.ObjectId, ref: "Donation", default: null },
    status: { type: String, default: "processed" },
  },
  { timestamps: true },
);

paymentEventSchema.plugin(clientJson);

export const PaymentEvent = mongoose.model("PaymentEvent", paymentEventSchema);
