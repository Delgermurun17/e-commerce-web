"use client"
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard() {
    const[isSaved, setIsSaved]=useState<boolean>(false)

    return (
        <div >
            <div className="relative aspect-[3/4] bg-slate-400 max-w-[245px] rounded-xl overflow-hidden " >
                <Image src="/image.jpg" width={2000} height={2000} alt="picture" />
                <button className="absolute top-4 right-4" onClick={()=>setIsSaved(x =>!x)}>
                    <Heart fill={`${isSaved ? "black" : "transparent"}`} className={`${isSaved ? 'text-black' : 'text-black'}  text-2xl`}/>
                </button>
            </div>
            <div className="text-base">
                <p className="font-normal">Product Name</p>
                <p className="font-bold">Price₮</p>
            </div>
        </div>
    )
}