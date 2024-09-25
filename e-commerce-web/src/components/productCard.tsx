"use client"
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
    className?: string
}

export default function ProductCard(props: Props) {
    const { className } = props;
    const [isSaved, setIsSaved] = useState<boolean>(false)

    return (
        <div className={className}>
            <div className="relative aspect-[3/4] bg-slate-400 rounded-xl overflow-hidden">
                <Image className="hover:scale-125 duration-700" src="/card.png" width={2000} height={2000} alt="picture" />
                <button className="absolute top-4 right-4" onClick={() => setIsSaved(x => !x)}>
                    <Heart strokeWidth={1} fill={isSaved ? "black" : "transparent"} className="duration-500" />
                </button>
            </div>
            <div className="text-base leading-6">
                <p className="font-normal">Local Styles Crewneck</p>
                <p className="font-bold">120.000₮</p>
            </div>
        </div>
    );
}
