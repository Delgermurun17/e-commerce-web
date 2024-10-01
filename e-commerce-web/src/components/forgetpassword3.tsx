"use client"

import { Input } from "@/components/ui/input";
import CountdownTimer from "@/components/CountdownTimer";
import Image from "next/image";
import { useState } from "react";

interface forgetpassword {
    onNext: () => void;
}

export default function ForgetPassword3({onNext}: forgetpassword) {
    const [resetTimer, setResetTimer] = useState<boolean>(false);

    const handleResetClick = () => {
        setResetTimer((prev) => !prev); // Toggle the reset state
    };
    return (
        <div>
            <div className="flex flex-col gap-12">
                <div className="mx-auto flex flex-col gap-6">
                    <Image alt="mail" src="/mail.png" width={96} height={96} className="mx-auto" />
                    <div className="text-center">
                        <p className="text-base font-bold">Баталгаажуулах</p>
                        <p>“mujo@nest.edu.mn” хаягт илгээсэн баталгаажуулах кодыг оруулна уу</p>
                    </div>
                    <div className="flex w-[221px] mx-auto">
                        <Input />
                        <Input />
                        <Input />
                        <Input onClick={onNext}/>
                    </div>
                </div>
                <button onClick={handleResetClick } className="text-slate-400 flex justify-center items-center gap-1 underline">
                    Дахин эхлэх(<CountdownTimer reset={resetTimer} />)
                </button>

            </div>
        </div>
    );
}