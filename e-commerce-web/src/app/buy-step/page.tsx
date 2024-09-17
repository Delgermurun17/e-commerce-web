"use client"

import BuyStepOne from "@/components/BuyStep1";
import { BuyStepTwo } from "@/components/BuyStep2";
import BuyStepThree from "@/components/BuyStep3";
import { useState } from "react";

const Page: React.FC = () => {
    const [step, setStep] = useState<number>(1);

    const isActiveStep = (stepNumber: number): string => {
        return step === stepNumber ? "bg-black text-white" : "bg-white text-black";
    };

    return (
        <main className="bg-gray-100 py-52">
            <div className="flex justify-center items-center mb-40">
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${isActiveStep(1)}`}>1</div>
                <div className="border-b border-black w-20"></div>
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${isActiveStep(2)}`}>2</div>
                <div className="border-b border-black w-20"></div>
                <div className={`size-8 p-[4px_12px] rounded-full border border-black text-base font-normal flex justify-center ${isActiveStep(3)}`}>3</div>
            </div>

            {step === 1 && <BuyStepOne />}
            {step === 2 && <BuyStepTwo />}
            {step === 3 && <BuyStepThree />}
        </main>
    );
};

export default Page;
