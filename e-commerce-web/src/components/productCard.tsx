"use client"
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    className?: string,
    image?: string,
    name?: string,
    price?: number,
    id: string
}

export default function ProductCard(props: Props) {
    const { className, image, name, price, id } = props;
    const [isSaved, setIsSaved] = useState<boolean>(false)
    


    return (
        <div className={`${className} cursor-pointer`}>
            <div className="relative aspect-[3/4] bg-slate-400 rounded-xl overflow-hidden " >
                <Link href={`/product/${id}`}>
                    {image &&
                        <Image priority={true} className="hover:scale-125 duration-700 object-cover w-full h-full" src={image} width={2000} height={2000} alt="picture" />
                    }
                </Link>
                <button className="absolute top-4 right-4" onClick={() => setIsSaved(x => !x)}>
                    <Heart fill={`${isSaved ? "black" : "transparent"}`} className={`${isSaved ? 'text-black' : 'text-black'} duration-500  text-2xl`} />
                </button>
            </div>
            <div className="md:text-base text-sm cursor-default">
                <Link href={`/product/${id}`}><p className="font-normal">{name}</p></Link>
                <p className="font-bold">{price}₮</p>
            </div>
        </div>
    )
}
