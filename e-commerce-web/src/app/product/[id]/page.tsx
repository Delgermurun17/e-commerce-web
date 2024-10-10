"use client"

import ProductCard from "@/components/productCard";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react"
import Image from "next/image";
import { useEffect, useState } from "react"

interface Product {
    productName: string;
    productCode: string;
    categoryId: string;
    price: number; 
    quantity: number;
    thumbnails: string;
    images: string[]; 
    coupon: string;
    salePercent: number;
    description: string;
    viewsCount: number;
    createdAt: Date;
    updatedAt: Date;
    types: { color: string; size: string; quantity: number }[];
    tag: string;
    sold: number;
}

interface PageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: PageProps) {
    const [data, setData] = useState<Product[]>([]);
    console.log({data})
    
    useEffect(() => {
        const fetchData = async () => {
            const productId = params?.id;

            if (!productId) {
                console.error("No ID provided");
                return;
            }

            try {
                const response = await fetch(`https://e-commerce-service-lowygdfni-delgermuruns-projects-8a2d67b5.vercel.app/products/${productId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const fetchedData = await response.json();
                const products = Array.isArray(fetchedData) ? fetchedData : [fetchedData];
                setData(products);

                if (products.length > 0 && products[0].images.length > 0) {
                    setSelectedImage(products[0].images[0]);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, [params]);

const products = data.find(d => d.price !== undefined); 
const price = products ? products.price : 0;

    const reset=() => {
        setNumber(1)
    }
    const product = [
        { size: "S", stock: 19 },
        { size: "M", stock: 5 },
        { size: "L", stock: 3 },
        { size: "XL", stock: 10 },
        { size: "2XL", stock: 0 },
    ];

    const defaultSize = product.find(pr => pr.stock > 0)?.size || "";
    const [selectedSize, setSelectedSize] = useState<string>(defaultSize);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [number, setNumber] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState("")

    const currentStock = product.find(p => p.size === selectedSize)?.stock || 0;
    const comment = [
        {name: "Saraa", comment: "Ваав материал ёстой гоё 😍"},
        {name: "Saraa", comment: "🔥🔥🔥"},
        {name: "Saraa", comment: "Ваав материал ёстой гоё  байна"},
        {name: "Saraa", comment: "Ваав материал ёстой гоё харагдаж байна Ваав материал ёстой гоё  байна "},
        {name: "Saraa", comment: "Ваав материал ёстой гоё  байна"},
    ]

    useEffect(() => {
        if (currentStock === 0) {
            const availableSize = product.find(p => p.stock > 0)?.size || "";
            setSelectedSize(availableSize);
            setNumber(0)
        }
    }, [currentStock, product]);

    const nemeh = () => {
        setNumber(prevNumber => (prevNumber < currentStock ? prevNumber + 1 : prevNumber));
    };

    const hasah = () => {
        setNumber(prevNumber => (prevNumber > 1 ? prevNumber - 1 : prevNumber));
    };

    const totalPrice = price * number;

    const [show, setShow] = useState<boolean>(true)
    const [selectedImage, setSelectedImage] = useState<string>("");
    

    return (


        
        <div className="w-[1040px] mx-auto flex flex-col gap-20 mt-14 mb-24">
            <div className="flex gap-5">
            {Array.isArray(data) && data.length > 0 ? (
                    data.map((p) => (

            <>         <div className="min-w-[67px] h-[392px] grid gap-2 pt-[100px]">
                                {p.images.map((img) => (
                                    <div
                                    key={img}
                                        className={`"w-[67px] h-[67px] rounded overflow-hidden cursor-pointer ${selectedImage === img ? "border border-black" : ""}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image style={{ width: '67px', height: 'auto' }} priority={true} src={img} className="min-w-[67px] h-[67px] object-contain" alt={`Image`} width={67} height={67} />
                                    </div>
                                ))}
                            </div>
                            <div className="min-w-[422px] min-h-[521px] rounded-2xl">
                                <Image style={{ width: '422px', height: 'auto' }} priority={true} className=" object-contain rounded-2xl" src={selectedImage} alt="Selected product" width={400} height={500} />
                            </div>
                        </>
                    ))
                ) : null}


                
                <div className="pt-[100px] flex flex-col gap-[55px]">

                {Array.isArray(data) && data.length > 0 ? (
                                data.map((p) => (
                    <div key={p.productCode} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                       
                                    <div className="flex flex-col gap-2">
                                        <div className="font-semibold text-xs leading-4 border border-blue-600 p-1 w-14 text-center rounded-2xl">шинэ</div>
                                        <div className="flex gap-2 items-center">
                                            <div className="font-bold text-2xl leading-8">{p.productName}</div>
                                            <div className="size-10 flex justify-center items-center">
                                                <Heart
                                                    onClick={() => setIsSaved(x => !x)}
                                                    strokeWidth={1}
                                                    fill={`${isSaved ? "black" : "transparent"}`}
                                                    className="duration-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="font-normal text-base leading-6">{p.description}</div>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal text-sm leading-5">Өнгөний сонголт</div>
                                        <div className="flex gap-2">
                                        {Array.from(new Set(p.types.map(type => type.color))).map((color, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => setSelectedColor(color)} 
                                                className={`border border-black p-1 rounded cursor-pointer ${selectedColor === color ? "bg-black text-white duration-500" : ""}`}
                                            >
                                                {color}
                                            </div>
                                        ))}
                                        </div>
                                    </div>

                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-sm leading-5">Хэмжээний заавар</div>
                                <div className="flex gap-1">{product.map((pr) => (
                                    <div onClick={() => {pr.stock > 0  && setSelectedSize(pr.size);
                                        pr.stock > 0  && reset()
                                    }} className={`size-8 rounded-full border border-black cursor-pointer font-normal text-xs text-center content-center ${selectedSize === pr.size && "bg-black text-white duration-500"} ${pr.stock === 0 ? "bg-[#E4E4E7] opacity-50 text-black cursor-not-allowed" : ""}`} key={pr.size}>{pr.size}</div>
                                ))}</div>
                            </div>
                            <div className="flex gap-1">
                                <div onClick={hasah} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">-</div>
                                <div className="size-8 text-center content-center text-xs font-normal outline-none">{number}</div>
                                <div onClick={nemeh} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">+</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-xl font-bold tracking-wide flex">{totalPrice}<div>₮</div></div>
                            <Button className="cursor-pointer w-[175px]" disabled={currentStock === 0}>Сагсанд нэмэх</Button>
                        </div>
                    </div>))
                            ) : (
                                null
                            )}


                            {/* comment */}
                    <div className="flex flex-col gap-6 max-w-[551px] ">
                    <div>
                        <div className="flex gap-4 text-sm font-normal">
                            <div>Үнэлгээ</div>
                            {show === true ? <div className="cursor-pointer text-[#2563EB] border-b border-[#2563EB]" onClick={() => setShow(false)}>бүгдийг харах</div> : <div className="cursor-pointer text-[#2563EB] border-b border-[#2563EB]" onClick={() => setShow(true)}>бүгдийг хураах</div>}
                        </div>
                        <div className="flex">
                            <Star fill="gold" stroke=""/>
                            <Star fill="gold" stroke=""/>
                            <Star fill="gold" stroke=""/>
                            <Star fill="gold" stroke=""/>
                            <Star fill="gold" stroke=""/>
                            4.6 (24)
                        </div>
                    </div>
                        {!show ? (comment.map((com, index) => (
                            <div key={com.name}>
                              <div className={`grid gap-1 text-sm font-normal border-t ${index === 0 ? 'border-none' : 'border-dashed border-gray-300 pt-4'}`}>
                                <div className="flex gap-1">
                                  {com.name}
                                  <div className="flex items-center">
                                    <Star size={16} fill="gold" stroke="" />
                                    <Star size={16} fill="gold" stroke="" />
                                    <Star size={16} fill="gold" stroke="" />
                                    <Star size={16} fill="gold" stroke="" />
                                    <Star size={16} fill="gold" stroke="" />
                                  </div>
                                </div>
                                <div className="text-[#71717A]">{com.comment}</div>
                              </div>
                            </div>
                          ))
                        ) : null}
                    {!show ? (<div className="bg-[#F4F4F5] p-6 rounded-2xl h-[294px] text-sm font-normal">
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <div className="leading-[14px]">Одоор үнэлэх:</div>
                                <div className="flex items-center">                                    
                                    <Star fill="gold" stroke="" />
                                    <Star fill="gold" stroke="" />
                                    <Star fill="gold" stroke="" />
                                    <Star fill="gold" stroke="" />
                                    <Star fill="gold" stroke="" />
                                </div>
                            </div>
                            <div  className="grid gap-2">
                                <div className="leading-[14px]">Сэтгэгдэл үлдээх:</div>
                                <div className="h-[94px]">
                                    <textarea className="p-[8px_12px] border border-[#E4E4E7] rounded-md w-full h-[94px] outline-none resize-none" placeholder="Энд бичнэ үү"/>
                                </div>
                            </div>
                            <div><Button className="px-9 font-medium">Үнэлэх</Button></div>
                        </div>
                    </div>) : null}
                    </div>
                </div>
            </div>



            <div className="flex flex-col gap-6 ">
            <h1 className="font-bold text-3xl leading-9">Холбоотой бараа</h1>
              <div className="grid grid-cols-4 mx-auto gap-5 mb-24">
              {[...Array(8)].map((_, index) => (
               <ProductCard key={index} className="w-[244px]" id={""}/>
               ))}
              </div>
            </div>
        </div>
    )
}
