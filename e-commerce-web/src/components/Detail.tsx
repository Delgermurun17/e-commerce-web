"use client"

import { Heart } from "lucide-react"
import { useState } from "react"


export const Detail= () => {

    const photo = [
        {photo: "p1"},
        {photo: "p2"},
        {photo: "p3"},
        {photo: "p4"},
    ]
    const [selectedPhoto, setSelectedPhoto] = useState("p1")
    const productSize = [
        { size: "S"},
        { size: "M"},
        { size: "L"},
        { size: "XL"},
        { size: "2XL"},
    ]
    const [selectedSize, setSelectedSize] = useState("S")
    const[isSaved, setIsSaved]=useState<boolean>(false)

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
                                    <div className="size-10 flex justify-center items-center"><Heart onClick={()=>setIsSaved(x =>!x)} strokeWidth={1} fill={`${isSaved ? "black" : "transparent"}`}/> </div>
                                </div>
                                <div>product details</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>Size</div>
                                <div className="flex gap-1">{productSize.map((pr) => (
                                    <div onClick={() => setSelectedSize(pr.size)} className={`size-8 rounded-full border border-black cursor-pointer font-normal text-xs text-center content-center ${selectedSize === pr.size ? "bg-black text-white" : ""}`} key={pr.size}>{pr.size}</div>
                                ))}</div>
                            </div>
                            <div>- 1 +</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>price</div>
                            <div>Sagsand nemeh</div>
                        </div>
                    </div>
                    <div>unelgee</div>
                </div>
            </div>
            <div>Holbootoi baraa</div>
        </div>
    )
}