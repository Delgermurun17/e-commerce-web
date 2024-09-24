"use client";

import BuyStepOne from "@/components/BuyStep1";
import { BuyStepTwo } from "@/components/BuyStep2";
import BuyStepThree from "@/components/BuyStep3";
import { Check } from "lucide-react";
import { useState } from "react";

const Page: React.FC = () => {
    const [step, setStep] = useState<number>(1); 

    return (
        <main className="bg-gray-100 h-[1000px] pt-8">
            <div className="flex justify-center items-center mb-14">
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${step > 0 ? "!border-[#2563EB] bg-[#2563EB] text-white !font-bold" : ""}`}>
                    {step > 1 ? <div className="content-center"><Check size={16}/></div> : <div>1</div>}
                </div>
                <div className="border-b border-black w-20"></div>
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${step > 1 ? "!border-[#2563EB] bg-[#2563EB] text-white !font-bold" : ""}`}>
                    {step > 2 ? <div className="content-center"><Check size={16}/></div> : <div>2</div>}
                </div>
                <div className="border-b border-black w-20"></div>
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${step > 2 ? "!border-[#2563EB] bg-[#2563EB] text-white !font-bold" : ""}`}>3</div>
            </div>

            {step === 1 && <BuyStepOne onNext={() => setStep(2)} />}
            {step === 2 && <BuyStepTwo onNext={() => setStep(3)} onBack={() => setStep(1)}/>}
            {step === 3 && <BuyStepThree onBack={() => setStep(2)}/>}
        </main>
    );
};

export default Page;
