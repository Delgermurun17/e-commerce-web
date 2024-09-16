import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export default function PaymentSection() {
    const banks = [
        {
            name: "transbank",
            img: "/transbank.png",
            link: "https://digital.etransbank.mn/"
        }, {

            name: "Mbank",
            img: "/mbank.png",
            link: "https://www.m-bank.mn/"
        }, {
            name: "ard",
            img: "/ard.png",
            link: "https://ard.mn/"
        }, {
            name: "qpay",
            img: "/qpay.png",
            link: "https://www.qpay.mn/"
        }, {
            name: "khanbank",
            img: "/khanbank.png",
            link: "https://www.khanbank.mn/"
        }, {
            name: "statebank",
            img: "/statebank.png",
            link: "https://www.statebank.mn//"
        }, {
            name: "xacbank",
            img: "/xac.png",
            link: "https://www.xacbank.mn/"
        }, {
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
            link: "https://www.ckbank.mn//"
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
        },
    ]



    return (
        <div className="h-screen bg-slate-50 pt-32">
            <div className="w-[700px] h-[690px] bg-white mx-auto pt text-black p-8 ">
                <p className="font-bold">3. Төлбөр төлөлт </p>

                <div>
                    <p className="mx-auto flex text-center w-7 px-5 justify-center border rounded-3xl bg-slate-200">14:59</p>
                    <Image alt="qr" src="/qr.png" width={187} height={187} className="mx-auto py-14 " />
                    <p className="text-center p-6">Төлөх боломжтой банкууд</p>
                    <div className=" text-black grid grid-cols-8 gap-5 px-5">
                        {banks.map((bank) => (
                            <Link href={bank.link} >
                                <Image alt={bank.name} src={bank.img} key={bank.name} width={50} height={50} />
                            </Link>
                        ))}
                    </div>
                </div>
                <button className="rounded-3xl border border-slate-600 shadow-lg py-2 px-9 mt-10 hover:opacity-80 active:opacity-50">Буцах</button>
            </div>
        </div>
    )
}