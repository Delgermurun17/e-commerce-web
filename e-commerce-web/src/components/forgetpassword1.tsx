"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loading from "./forgetpasswordloader";
import CountdownTimer from "@/components/CountdownTimer";
import Image from "next/image";


interface forgetpassword {
    onNext: () => void;
}

export default function Forgetpassword1 ({ onNext }: forgetpassword) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [step, setStep] = useState("1")
    const [resetTimer, setResetTimer] = useState<boolean>(false);
    const [input, setInput] = useState("")
    const [invalidOTP, setInvalidOTP] = useState(false)


    const handleResetClick = () => {
        setResetTimer((prev) => !prev); 
    };

    
    const verify = async (otp: string) => {
        try {
            setLoading(true);
            const res = await fetch("https://e-commerce-service-lowygdfni-delgermuruns-projects-8a2d67b5.vercel.app/verify", {
                method: "POST",
                body: JSON.stringify({ email, otp }), // Use the passed otp
                headers: { "Content-Type": "application/json" },
            });
            console.log(otp)
            setLoading(false);
            if (res.ok) {
                onNext();
            } else if (res.status === 400) {
                setInvalidOTP(true);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setLoading(false);
        }
    };
    
    

    const sendCode = async () => {
        try {
            setLoading(true)
            await fetch("https://e-commerce-service-lowygdfni-delgermuruns-projects-8a2d67b5.vercel.app/generate", {
                method: "POST", 
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });
            console.log('gmail taarsan')
            setLoading(false)
            //send code
            setStep("2")
        } catch (error) {
            console.log(error)
        }

    }


    
    return (<div>
    {step === "1" && <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold text-center">Нууц үг сэргээх</p>
            <div className="w-80 mx-auto flex flex-col gap-6">
                {loading ? < Loading /> :
                    <>
                        <input type="email" id="email" className={`h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black`} placeholder="Имэйл хаяг оруулах" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                        <Button onClick={sendCode}>Илгээх</Button>
                    </>
                }
            </div>
        </div>}
        {step === "2" &&            <div className="flex flex-col gap-12">
                <div className="mx-auto flex flex-col gap-6">
                    <Image alt="mail" src="/mail.png" width={96} height={96} className="mx-auto" />
                    <div className="text-center">
                        <p className="text-base font-bold">Баталгаажуулах</p>
                        <p>“{email}” хаягт илгээсэн баталгаажуулах кодыг оруулна уу</p>
                    </div>
                    <form className="flex w-[221px] mx-auto flex-col gap-2">
                        <input  onChange={(e) => {const value = e.target.value; setInput(value); if (value.length === 4) {setTimeout(() => verify(value), 0);}}} 
                                className={`h-14 w-56 px-6 text-4xl font-medium rounded-[8px] focus:border-black border-[#D6D8DB] border outline-none tracking-[27px] ${invalidOTP ? "border-red-600" : ""}`} 
                                maxLength={4} 
                                value={input} />
                        {invalidOTP && <div className="text-sm font-normal text-red-600">Invalid OTP</div>}
                    </form>
                </div>
                <button onClick={handleResetClick } className="text-slate-400 flex justify-center items-center gap-1 underline">
                    Дахин эхлэх(<CountdownTimer reset={resetTimer} />)
                </button>
            </div>}
        </div>
    );
}