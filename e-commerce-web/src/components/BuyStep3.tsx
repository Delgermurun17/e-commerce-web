"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function BuyStepThree() {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(countdown); // stop the timer at 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000); // update every second

        return () => clearInterval(countdown); // cleanup the interval when the component unmounts
    }, []);

    // Format time as mm:ss
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const banks = [
        {       
            name: "transbank",
            img: "/transbank.png",
            link: "https://digital.etransbank.mn/"
        },
        {
            name: "Mbank",
            img: "/mbank.png",
            link: "https://www.m-bank.mn/"
        },
        {
            name: "ard",
            img: "/ard.png",
            link: "https://ard.mn/"
        },
        {
            name: "qpay",
            img: "/qpay.png",
            link: "https://www.qpay.mn/"
        },
        {
            name: "khanbank",
            img: "/khanbank.png",
            link: "https://www.khanbank.mn/"
        },
        {
            name: "statebank",
            img: "/statebank.png",
            link: "https://www.statebank.mn/"
        },
        {
            name: "xacbank",
            img: "/xac.png",
            link: "https://www.xacbank.mn/"
        },
        {
            name: "etdbm",
            img: "/etdbm.png",
            link: "https://www.etdbm.mn/"
        },
        {
            name: "xacbank",
            img: "/pocket.png",
            link: "https://www.xacbank.mn/"
        },
        {
            name: "mostmoney",
            img: "/mostmoney.png",
            link: "https://www.mostmoney.mn/"
        },
        {
            name: "ckbank",
            img: "/ckbank.png",
            link: "https://www.ckbank.mn/"
        },
        {
            name: "capitronbank",
            img: "/capitronbank.png",
            link: "https://www.capitronbank.mn/"
        },
        {
            name: "bogdbank",
            img: "/bogdbank.png",
            link: "https://www.bogdbank.com/"
        }
    ];

    return (
        <div className="h-screen bg-gray-100 pt-32">
            <div className="bg-white w-[687px] h-[656.7px] rounded-2xl mx-auto">
                <div className="p-8">
                    <div className="font-semibold text-lg">3. Төлбөр төлөлт</div>
                    <div className="flex flex-col gap-4 items-center mt-9 mb-6">
                        <div className="bg-gray-200 rounded-2xl">
                            <p className="px-2 py-1">{formatTime(timeLeft)}</p>
                        </div>
                        <Image alt="qr" src={"/QR.png"} width={187} height={187} />
                    </div>
                    <div className="flex flex-col gap-5 items-center">
                        <div className="font-normal text-base">Төлөх боломжтой банкууд:</div>
                        <div className="grid grid-cols-8 gap-6 px-10 mb-14">
                            {banks.map((bank) => (
                                <Link href={bank.link} key={bank.name}>
                                    <Image
                                        alt={`Logo of ${bank.name}`}
                                        src={bank.img}
                                        width={50}
                                        height={50}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Button className="bg-white text-black hover:bg-slate-100 border">Буцах</Button>
                </div>
            </div>
        </div>
    );
}
