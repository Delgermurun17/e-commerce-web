"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface CardData {
    id: number;
    title: string; 
    price: number; 
    stock: number;
}

const initialCardData: CardData[] = [
    { id: 1, title: "Chunky Glyph Tee", price: 140000, stock: 10 },
    { id: 2, title: "Doodle Hoodie", price: 120000, stock: 10 },
    { id: 3, title: "Local Styles Crewneck", price: 100000, stock: 10 },
    { id: 4, title: "Local Styles Crewneck", price: 150000, stock: 10 },
];

export default function BuyStep1() {
    const step: number = 1;
    const [cards, setCards] = useState<CardData[]>(initialCardData);
    const [filledCards, setFilledCards] = useState<Set<number>>(new Set());
    const [quantities, setQuantities] = useState<Record<number, number>>(
        initialCardData.reduce((acc, card) => {
            acc[card.id] = 1;
            return acc;
        }, {} as Record<number, number>)
    );

    const savedCount = cards.length;

    const handleHeartClick = (id: number) => {
        setFilledCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });

        setTimeout(() => {
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));
            setQuantities((prevQuantities) => {
                const newQuantities = { ...prevQuantities };
                delete newQuantities[id];
                return newQuantities;
            });
        }, 700);
    };

    const handleQuantityChange = (id: number, delta: number) => {
        setQuantities((prevQuantities) => {
            const newQuantity = (prevQuantities[id] || 1) + delta;
            if (newQuantity < 1) return prevQuantities;
            const card = cards.find((card) => card.id === id);
            if (card && newQuantity > card.stock) return prevQuantities;
            return { ...prevQuantities, [id]: newQuantity };
        });
    };

    const totalPrice = cards.reduce((sum, card) => {
        const quantity = quantities[card.id] || 1;
        return sum + card.price * quantity;
    }, 0);

    return (
        <div className="w-[638px] bg-white mx-auto p-8 rounded-2xl">
            <div className="h-full w-full flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-1 font-bold text-xl">
                        <div>{step}.</div>
                        <div>Сагс</div>
                        <div className="font-medium text-[#71717A]">({savedCount})</div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 max-w-[622px] w-full">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className={`flex gap-6 p-4 h-[132px] rounded-2xl border border-gray-200 duration-700 ${
                                        filledCards.has(card.id)
                                            ? "translate-y-[-50px] opacity-0"
                                            : "translate-y-0 opacity-100"
                                    }`}
                                    style={{
                                        transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
                                    }}
                                >
                                    <div className="w-[100px] h-[100px] rounded-xl bg-gradient-to-r from-sky-900 to-slate-300"></div>
                                    <div className="flex flex-col w-[402px]">
                                        <div className="flex flex-col gap-2 text-black">
                                            <h1 className="font-normal text-base leading-6">{card.title}</h1>
                                            <div className="flex gap-1">
                                                <div
                                                    onClick={() => handleQuantityChange(card.id, -1)}
                                                    className="size-8 rounded-full border border-black cursor-pointer text-center content-center"
                                                >
                                                    -
                                                </div>
                                                <div className="size-8 text-center content-center text-xs font-normal outline-none">
                                                    {quantities[card.id] || 1}
                                                </div>
                                                <div
                                                    onClick={() => handleQuantityChange(card.id, 1)}
                                                    className="size-8 rounded-full border border-black cursor-pointer text-center content-center"
                                                >
                                                    +
                                                </div>
                                            </div>
                                            <p className="font-bold text-sm leading-5">
                                                    {(quantities[card.id] || 1) * card.price}₮
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Trash2
                                            onClick={() => handleHeartClick(card.id)}
                                            strokeWidth={1}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pb-6 flex justify-between">
                        <div className="text-lg font-normal">Нийт төлөх дүн:</div>
                        <div className="text-xl font-bold">{totalPrice}₮</div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button className="px-9">Худалдан авах</Button>
                </div>
            </div>
        </div>
    );
}
