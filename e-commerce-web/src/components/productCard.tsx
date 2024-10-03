"use client"
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
    className?: string
}

export default function ProductCard(props: Props) {
    const { className } = props;
    const [isSaved, setIsSaved] = useState<boolean>(false)

    return (
        <div className={`${className} cursor-pointer`}>
            <div className="relative aspect-[3/4] bg-slate-400 rounded-xl overflow-hidden " >
                <Link href={"/product"}><Image priority={true} className="hover:scale-125 duration-700" src="/card.png" width={2000} height={2000} alt="picture" /></Link>
                <button className="absolute top-4 right-4" onClick={() => setIsSaved(x => !x)}>
                    <Heart fill={`${isSaved ? "black" : "transparent"}`} className={`${isSaved ? 'text-black' : 'text-black'} duration-500  text-2xl`} />
                </button>
            </div>
            <div className="md:text-base text-sm cursor-default">
            <Link href={"/product"}><p className="font-normal">Product Name</p></Link>  
                <p className="font-bold">Price₮</p>
            </div>
        </div>
    )
}
