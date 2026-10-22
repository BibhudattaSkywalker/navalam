import { useState } from "react";
import { AssetImage } from "@/components/ui/AssetImage";
import { DemoPaymentModal } from "@/components/sections/donation/DemoPaymentModal";
const plans = ["500", "1000", "2500"].map((amount) => ({
    amount: `₹${amount}`,
    value: amount,
    frequency: `₹${amount}/ Month`,
    description: "Support a child's education and care every month",
}));
function PlanCard({ amount, frequency, description, selected, onSelect, }) {
    return (<article className={`flex h-auto w-full max-w-[396px] flex-col items-center rounded-[37px] bg-white px-8 pb-10 pt-12 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] transition-shadow ${selected ? "ring-2 ring-green" : ""}`}>
      <p className="font-[family-name:var(--font-poppins)] text-[34px] leading-[1.1] text-green lg:text-[40px] lg:leading-[41px]">
        {amount}
      </p>
      <p className="mt-1 font-[family-name:var(--font-poppins)] text-[22px] text-green lg:text-[20px] lg:leading-[41px]">
        {frequency}
      </p>
      <p className="mt-2 max-w-[282px] text-center font-[family-name:var(--font-poppins)] text-[18px] font-light leading-[22px] text-[#232222] lg:text-[15px]">
        {description}
      </p>

      <button type="button" onClick={onSelect} className="mt-5 inline-flex h-[50px] w-[150px] items-center justify-center gap-2 rounded-full gradient-orange font-[family-name:var(--font-lato)] text-[15px] text-white shadow-[0px_6px_17px_0px_rgba(120,80,20,0)] transition-opacity hover:opacity-90">
        Select
        <AssetImage src="/images/monthly-giving/select-arrow.svg" alt="" width={21} height={13} className="h-[13px] w-[21px] object-contain"/>
      </button>
    </article>);
}
export function MonthlyPlanCards() {
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [payOpen, setPayOpen] = useState(false);
    return (<div className="grid justify-center gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[43px]">
      {plans.map((plan, index) => (<PlanCard key={index} amount={plan.amount} frequency={plan.frequency} description={plan.description} selected={selectedPlan === index} onSelect={() => { setSelectedPlan(index); setPayOpen(true); }}/>))}
      <DemoPaymentModal open={payOpen} onClose={() => setPayOpen(false)} amount={plans[selectedPlan].value} donor={{ name: "", email: "" }} frequency="Monthly"/>
    </div>);
}
