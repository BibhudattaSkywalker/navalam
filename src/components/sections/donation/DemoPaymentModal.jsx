import { createPortal } from "react-dom";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

const methods = ["UPI", "Card", "Net banking"];
const banks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];

const inputClass =
  "mt-1 h-[44px] w-full rounded-[10px] border border-[#c2c2c2] px-4 text-[14px] text-[#232222] placeholder:text-[#9e9e9e] focus:outline-none focus:ring-1 focus:ring-green";

function Field({ label, error, ...props }) {
  return (
    <label className="block text-[13px] text-black">
      {label}
      <input {...props} className={inputClass} />
      {error && <span className="text-[12px] text-red-600">{error}</span>}
    </label>
  );
}

function validate(method, v) {
  if (method === "UPI") {
    return /^[\w.-]+@[\w]+$/.test(v.upi) ? {} : { upi: "Enter a valid UPI ID (e.g. name@upi)" };
  }
  if (method === "Card") {
    const e = {};
    if (v.card.replace(/\s/g, "").length !== 16) e.card = "Enter 16-digit card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v.expiry)) e.expiry = "Use MM/YY";
    if (!/^\d{3}$/.test(v.cvv)) e.cvv = "3 digits";
    return e;
  }
  return v.bank ? {} : { bank: "Select a bank" };
}

/**
 * Demo-only payment flow: no real gateway, nothing is charged or sent anywhere.
 * donor: { name, email, mobile }, amount in INR, frequency: "One-time" | "Monthly".
 */
export function DemoPaymentModal({ open, onClose, amount, donor, frequency = "One-time" }) {
  const [method, setMethod] = useState("UPI");
  const [values, setValues] = useState({ upi: "", card: "", expiry: "", cvv: "", bank: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("form"); // form | processing | success | failed
  const [receipt, setReceipt] = useState(null);
  const [payer, setPayer] = useState({ name: "", email: "" });
  const [submitError, setSubmitError] = useState("");
  const [simulateFail, setSimulateFail] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus("form");
      setErrors({});
      setSubmitError("");
      setSimulateFail(false);
      setPayer({ name: donor?.name || "", email: donor?.email || "" });
      setValues({ upi: "", card: "", expiry: "", cvv: "", bank: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset only when the modal opens
  }, [open]);

  if (!open) return null;

  const set = (key) => (e) => setValues((p) => ({ ...p, [key]: e.target.value }));

  const pay = async (e) => {
    e.preventDefault();
    const errs = validate(method, values);
    if (!payer.name.trim()) errs.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(payer.email)) errs.email = "Enter a valid email";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("processing");
    setSubmitError("");
    try {
      const [{ donation }] = await Promise.all([
        api("/api/donations", {
          method: "POST",
          body: JSON.stringify({
            donorName: payer.name.trim(),
            email: payer.email.trim(),
            phone: donor?.mobile || "",
            amount: Number(amount),
            type: frequency === "Monthly" ? "monthly" : "one-time",
            method,
          }),
        }),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
      if (simulateFail) {
        await api("/api/payments/demo-fail", {
          method: "POST",
          body: JSON.stringify({ donationId: donation.id, method }),
        });
        setStatus("failed");
        return;
      }
      const confirmed = await api("/api/payments/demo-confirm", {
        method: "POST",
        body: JSON.stringify({ donationId: donation.id, method }),
      });
      setReceipt({
        id: confirmed.donation.transactionId,
        date: new Date(confirmed.donation.paidAt || Date.now()).toLocaleString("en-IN"),
      });
      setStatus("success");
    } catch (err) {
      setSubmitError(err.message);
      setStatus("form");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={status === "processing" ? undefined : onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-[440px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "failed" ? (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-[32px] text-white">
              ×
            </div>
            <h3 className="mt-4 text-[24px] font-medium">Payment failed</h3>
            <p className="mt-1 text-[14px] text-[#666]">
              Your ₹{amount} {frequency.toLowerCase()} payment could not be completed. No money was charged.
            </p>
            <p className="mt-3 text-[12px] text-[#999]">Demo mode: this failure was simulated.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={onClose} className="h-[44px] rounded-full bg-[#e4e4e4]">Close</button>
              <button type="button" onClick={() => { setSimulateFail(false); setStatus("form"); }} className="h-[44px] rounded-full gradient-orange text-white">Try again</button>
            </div>
          </div>
        ) : status === "success" ? (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green text-[32px] text-white">
              ✓
            </div>
            <h3 className="mt-4 text-[24px] font-medium">Thank you, {payer.name || "Friend"}!</h3>
            <p className="mt-1 text-[14px] text-[#666]">Your demo donation was successful.</p>
            <dl className="mt-5 space-y-2 rounded-[10px] bg-[#f1f1f1] p-4 text-left text-[14px]">
              <div className="flex justify-between"><dt>Amount</dt><dd className="font-medium">₹{amount}</dd></div>
              <div className="flex justify-between"><dt>Type</dt><dd>{frequency}</dd></div>
              <div className="flex justify-between"><dt>Method</dt><dd>{method}</dd></div>
              <div className="flex justify-between"><dt>Transaction ID</dt><dd>{receipt.id}</dd></div>
              <div className="flex justify-between"><dt>Date</dt><dd>{receipt.date}</dd></div>
              <div className="flex justify-between"><dt>Receipt for</dt><dd>{payer.email}</dd></div>
            </dl>
            <p className="mt-3 text-[12px] text-[#999]">Demo mode: no real payment was made.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 inline-flex h-[44px] w-full items-center justify-center rounded-full gradient-orange text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={pay} noValidate>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[22px] font-medium">Secure Checkout</h3>
                <p className="text-[13px] text-[#666]">
                  {frequency} donation · <span className="font-medium text-green">₹{amount}</span>
                </p>
              </div>
              <button type="button" onClick={onClose} disabled={status === "processing"} aria-label="Close" className="text-[24px] leading-none text-[#666]">
                ×
              </button>
            </div>
            <p className="mt-2 rounded-md bg-[#fff6e5] px-3 py-1.5 text-[12px] text-[#8a5a00]">
              Demo mode — use any dummy details. Nothing is charged.
            </p>

            <label className="mt-3 flex items-center gap-2 text-[13px] text-[#555]">
              <input type="checkbox" checked={simulateFail} onChange={(e) => setSimulateFail(e.target.checked)} />
              Simulate a failed payment (demo)
            </label>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMethod(m); setErrors({}); }}
                  className={`h-[40px] rounded-[8px] text-[14px] ${method === m ? "border-2 border-green bg-white font-medium" : "bg-[#e4e4e4]"}`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {!(donor?.name && donor?.email) && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Your name" placeholder="Full name" value={payer.name}
                    onChange={(e) => setPayer((p) => ({ ...p, name: e.target.value }))} error={errors.name} />
                  <Field label="Email" placeholder="you@example.com" type="email" value={payer.email}
                    onChange={(e) => setPayer((p) => ({ ...p, email: e.target.value }))} error={errors.email} />
                </div>
              )}
              {method === "UPI" && (
                <Field label="UPI ID" placeholder="name@upi" value={values.upi} onChange={set("upi")} error={errors.upi} />
              )}
              {method === "Card" && (
                <>
                  <Field label="Card number" placeholder="4111 1111 1111 1111" inputMode="numeric" maxLength={19} value={values.card}
                    onChange={(e) => setValues((p) => ({ ...p, card: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") }))}
                    error={errors.card} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" placeholder="MM/YY" maxLength={5} value={values.expiry}
                      onChange={(e) => setValues((p) => ({ ...p, expiry: e.target.value.replace(/[^\d/]/g, "") }))} error={errors.expiry} />
                    <Field label="CVV" placeholder="123" type="password" inputMode="numeric" maxLength={3} value={values.cvv}
                      onChange={(e) => setValues((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))} error={errors.cvv} />
                  </div>
                </>
              )}
              {method === "Net banking" && (
                <label className="block text-[13px] text-black">
                  Select bank
                  <select value={values.bank} onChange={set("bank")} className={inputClass}>
                    <option value="">Choose your bank</option>
                    {banks.map((b) => <option key={b}>{b}</option>)}
                  </select>
                  {errors.bank && <span className="text-[12px] text-red-600">{errors.bank}</span>}
                </label>
              )}
            </div>

            {(submitError || ((errors.name || errors.email) && donor?.name && donor?.email)) && (
              <p className="mt-3 text-[13px] text-red-600">
                {submitError || "Donor name or email is missing. Close this and fill the form."}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "processing"}
              className="mt-5 inline-flex h-[46px] w-full items-center justify-center rounded-full gradient-orange text-[16px] text-white disabled:opacity-70"
            >
              {status === "processing" ? "Processing payment…" : `Pay ₹${amount}`}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
