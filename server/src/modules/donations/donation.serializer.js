const causeSummary = (cause) => (cause?.title ? { title: cause.title, slug: cause.slug } : null);

/** What the donor-facing site and the checkout flow receive. */
export function toDonationView(donation, cause = null) {
  const json = donation.toJSON();
  return {
    id: json.id,
    donorName: json.donorName,
    email: json.email,
    phone: json.phone,
    amount: json.amount,
    currency: json.currency,
    type: json.type,
    method: json.method,
    status: json.status,
    transactionId: json.transactionId || json.orderReference,
    orderReference: json.orderReference,
    razorpayOrderId: json.razorpayOrderId || "",
    razorpayPaymentId: json.razorpayPaymentId || "",
    paidAt: json.paidAt,
    createdAt: json.createdAt,
    cause: causeSummary(cause),
  };
}

/** Public receipt: deliberately leaves out email, phone and gateway ids. */
export function toReceipt(donation) {
  return {
    id: donation.id,
    donorName: donation.donorName,
    amount: donation.amount,
    currency: donation.currency,
    type: donation.type,
    method: donation.method,
    status: donation.status,
    transactionId: donation.transactionId || donation.orderReference,
    paidAt: donation.paidAt,
    createdAt: donation.createdAt,
    cause: causeSummary(donation.causeId),
  };
}

/** Admin list and detail rows: the full record plus the populated cause. */
export function toAdminDonation(donation) {
  const cause = donation.causeId?.title ? donation.causeId : null;
  return {
    ...donation.toJSON(),
    ...(cause ? { causeId: String(cause._id) } : {}),
    cause: cause ? { id: String(cause._id), title: cause.title, slug: cause.slug } : null,
  };
}
