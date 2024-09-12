"use client"

import { Heart } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"


export const Detail= () => {

    const photo = [
        {photo: "p1"},
        {photo: "p2"},
        {photo: "p3"},
        {photo: "p4"},
    ]
    const [selectedPhoto, setSelectedPhoto] = useState("p1")
    const productSize = [
        { size: "S", out: ""},
        { size: "M", out: "M"},
        { size: "L", out: "L"},
        { size: "XL", out: ""},
        { size: "2XL", out: ""},
    ]
    const defaultSize = productSize.find(pr => pr.out === "")?.size || "";
    const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
    const[isSaved, setIsSaved]=useState<boolean>(false)
    const [number, setNumber] = useState<number>(1)

    return (
        <div className="w-[1040px] mx-auto flex flex-col gap-20 mt-[100px]">
            <div className="flex gap-5">
                <div className="w-[67px] h-[392px] grid gap-2 pt-[100px]">
                    {photo.map((p) => (
                        <div className={`size-[67px] rounded ${selectedPhoto === p.photo ? "border border-black" : ""}`} onClick={() => setSelectedPhoto(p.photo)} key={p.photo}>{p.photo}</div>
                    ))}
                </div>
                <div className="w-[422px] h-[521px] rounded-2xl border-[2px] border-black text-center content-center text-5xl">{selectedPhoto}</div>
                <div className="pt-[100px] flex flex-col gap-[55px]">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div>new</div>
                                <div className="flex gap-2 items-center">
                                    <div>product name</div>
                                    <div className="size-10 flex justify-center items-center"><Heart onClick={()=>setIsSaved(x =>!x)} strokeWidth={1} fill={`${isSaved ? "black" : "transparent"}`} className="duration-500"/> </div>
                                </div>
                                <div>product details</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Size</div>
                                <div className="flex gap-1">{productSize.map((pr) => (
                                    <div onClick={() => pr.out === "" && setSelectedSize(pr.size)} className={`size-8 rounded-full border border-black cursor-pointer font-normal text-xs text-center content-center ${selectedSize === pr.size ? "bg-black text-white duration-500" : "duration-300"} ${pr.size === pr.out ? "bg-[#E4E4E7] opacity-50 text-black cursor-not-allowed" : ""}`} key={pr.size}>{pr.size}</div>
                                ))}</div>
                            </div>
                            <div className="flex gap-1">
                                <div onClick={() => setNumber(number - 1)} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">-</div>
                                {/* <input value={number} onChange={(e) => setNumber(Number(e.target.value))} className="size-8 text-center content-center text-xs font-normal outline-none" type="text"/> */}
                                <div className="size-8 text-center content-center text-xs font-normal outline-none">{number}</div>
                                <div onClick={() => setNumber(number + 1)} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">+</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-xl font-bold tracking-wide ">120’000₮</div>
                            <Button>Сагсанд нэмэх</Button>
                        </div>
                    </div>
                    <div>unelgee</div>
                </div>
            </div>
            <div>Holbootoi baraa</div>
        </div>
    )
}