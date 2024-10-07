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
    const [loading, setLoading] = useState(false);

    const handleResetClick = () => {
        setResetTimer((prev) => !prev); // Toggle the reset state
    };

    // const checkCode = () => {
    //     try {
    //         //input value ===  sendCode 
    //         onNext
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const [input, setInput] = useState("")
    console.log({input})

    return (
        <div>
            <div className="flex flex-col gap-12">
                <div className="mx-auto flex flex-col gap-6">
                    <Image alt="mail" src="/mail.png" width={96} height={96} className="mx-auto" />
                    <div className="text-center">
                        <p className="text-base font-bold">Баталгаажуулах</p>
                        <p>“{}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу</p>
                    </div>
                    <form className="flex w-[221px] mx-auto">
                        <input onChange={(e) => setInput(e.target.value)} className="h-14 w-56 px-6 text-4xl font-medium tracking-[27px]" maxLength={4}/>
                    </form>
                </div>
                <button onClick={handleResetClick } className="text-slate-400 flex justify-center items-center gap-1 underline">
                    Дахин эхлэх(<CountdownTimer reset={resetTimer} />)
                </button>

            </div>
        </div>
    );
}