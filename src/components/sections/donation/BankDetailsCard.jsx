import { useState } from "react";
const bankFields = [
    { label: "Account Name :-", value: "Nalvalam Foundations" },
    { label: "Bank Name :-", value: "HDFC Bank" },
    { label: "Account Number :-", value: "9893000100075486" },
    { label: "IFSC Code :-", value: "HDFC45897" },
    { label: "Branch :-", value: "Delhi" },
];
export function BankDetailsCard() {
    const [copiedField, setCopiedField] = useState(null);
    async function copyValue(label, value) {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(label);
            window.setTimeout(() => setCopiedField(null), 2000);
        }
        catch {
            setCopiedField(null);
        }
    }
    return (<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_237px] lg:items-start lg:gap-x-[65px]">
      <div className="space-y-0">
        {bankFields.map((field) => (<div key={field.label} className="grid gap-2 sm:grid-cols-[minmax(0,200px)_1fr] sm:items-center sm:gap-8">
            <p className="font-[family-name:var(--font-poppins)] text-[20px] text-black lg:text-[18px] lg:leading-[61px] bg-amber-100 px-3">
              {field.label}
            </p>
            <button type="button" onClick={() => copyValue(field.label, field.value)} className="text-left font-[family-name:var(--font-poppins)] text-[20px] text-black transition-opacity hover:opacity-70 lg:text-[18px] lg:leading-[61px] cursor-pointer" title={`Copy ${field.label}`}>
              {field.value}
              {copiedField === field.label ? (<span className="ml-3 text-[14px] text-green lg:text-[15px]">
                  Copied
                </span>) : null}
            </button>
          </div>))}
      </div>

      <div className="mx-auto flex w-full max-w-[237px] flex-col items-center lg:mx-0">
        <div className="relative h-[238px] w-[229px] rounded-[10px] ">
          <div className="absolute -left-[5px] -top-[1px] h-[237px] w-[237px] overflow-hidden rounded-[31px] border border-x-black">
            <img src="/images/bank-details/qr-code.png" alt="Donation QR code" className="h-full w-full object-cover"/>
          </div>
        </div>
        <p className="mt-6 font-[family-name:var(--font-poppins)] text-[25px] text-black lg:text-[24px] lg:leading-[61px]">
          NGO
        </p>
      </div>
    </div>);
}
