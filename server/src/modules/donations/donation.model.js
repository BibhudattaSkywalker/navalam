import mongoose from "mongoose";
import { DONATION_STATUS, DONATION_TYPE, values } from "../../config/constants.js";
import { clientJson } from "../../core/clientJson.js";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    type: { type: String, enum: values(DONATION_TYPE), default: DONATION_TYPE.ONE_TIME },
    method: { type: String, default: "UPI" },
    status: { type: String, enum: values(DONATION_STATUS), default: DONATION_STATUS.PENDING },
    transactionId: { type: String, default: "" },
    orderReference: { type: String, required: true, unique: true },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    causeId: { type: mongoose.Schema.Types.ObjectId, ref: "Cause", default: null },
    appliedToCause: { type: Boolean, default: false },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true },
);

donationSchema.plugin(clientJson);
donationSchema.index({ email: 1, createdAt: -1 });
donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ razorpayOrderId: 1 });

export const Donation = mongoose.model("Donation", donationSchema);
