"use client";
import Forgetpassword1 from '@/components/forgetpassword1';
import ForgetPassword2 from '@/components/forgetpassword2';
import ForgetPassword3 from '@/components/forgetpassword3';
import { Check } from "lucide-react";
import { useState } from "react";



const Page: React.FC = () => {
    const [step, setStep] = useState<number>(1);

    return (
        <div className="h-[710px] bg-slate-100">
            <div className="w-[1040px] mx-auto pt-28 flex flex-col gap-6">
                {step === 1 && <Forgetpassword1 onNext={() => setStep(2)} />}
                {step === 2 && <ForgetPassword3 />}
            </div>

        </div>
    );
};

export default Page;
