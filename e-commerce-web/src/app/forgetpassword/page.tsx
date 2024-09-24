"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from 'react';
import ReactLoading from 'react-loading';

import CountdownTimer from "@/components/CountdownTimer";










export default function Page() {
    const [resetTimer, setResetTimer] = useState<boolean>(false);

    const handleResetClick = () => {
        setResetTimer((prev) => !prev); // Toggle the reset state
    };

    return (
        <div className="h-screen bg-slate-100">
            <div className="w-[1040px] mx-auto pt-28 flex flex-col gap-6">


                <p className="text-2xl font-bold text-center">Нууц үг сэргээх</p>
                <div className="w-80 mx-auto flex flex-col gap-6">
                    <Input placeholder="Имэйл хаяг оруулах" className="rounded-full border-nones shadow-md text-zinc-500" />
                    <Button className="w-full">Илгээх</Button>
                </div>
                <ReactLoading type={"spinningBubbles"} color={"#71717A"} height={48} width={48} />
                <div className="w-[1040px] mx-auto pt-28 flex flex-col gap-6">
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
                                <Input />
                            </div>
                        </div>
                        <button onClick={handleResetClick} className="text-slate-400 flex justify-center items-center gap-1 underline">
                            Дахин эхлэх(<CountdownTimer reset={resetTimer} />)
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}
