"use client";

import { useState } from "react";
import { Heart, Trash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";


interface CardData {
    id: number;
    title: string; 
    price: number; 
    stock: number;
  }
  
  const initialCardData: CardData[] = [
    { id: 1, title: "Chunky Glyph Tee", price: 120000, stock: 10 },
    { id: 2, title: "Doodle Hoodie", price: 120000, stock: 10 },
    { id: 3, title: "Local Styles Crewneck", price: 100000, stock: 10 },
  ];
  

export default function BuyStep1(){
    const step:number = 1


// -------------------------------------------
const [cards, setCards] = useState<CardData[]>(initialCardData);
  const [filledCards, setFilledCards] = useState<Set<number>>(new Set());

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
    }, 700);
  };
//---------------------------------------------
const [number, setNumber] = useState<number>(1);

const nemeh = () => {
    setNumber(prevNumber => (prevNumber < 10 ? prevNumber + 1 : prevNumber));
};

const hasah = () => {
    setNumber(prevNumber => (prevNumber > 1 ? prevNumber - 1 : prevNumber));
};
const totalPrice = cards.reduce((sum, card) => sum + card.price, 0);

    return(
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
                                      filledCards.has(card.id) ? "translate-y-[-50px] opacity-0" : "translate-y-0 opacity-100"
                                    }`}
                                    style={{
                                      transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
                                    }}
                                  >
                                    <div className="w-[100px] h-[100px] rounded-xl bg-gradient-to-r from-sky-900 to-slate-300"></div>
                                    <div className="flex flex-col w-[402px]">
                                      <div className="gap-1 text-black">
                                        <h1 className="font-normal text-base leading-6">{card.title}</h1>
                                        <p className="font-bold text-sm leading-5">{card.price}₮</p>
                                        <div className="flex gap-1">
                                <div onClick={hasah} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">-</div>
                                <div className="size-8 text-center content-center text-xs font-normal outline-none">{number}</div>
                                <div onClick={nemeh} className="size-8 rounded-full border border-black cursor-pointer text-center content-center">+</div>
                            </div>
                                      </div>
                                    </div>
                                    <div>
                                        <Trash2 onClick={() => handleHeartClick(card.id)} strokeWidth={1} style={{ cursor: "pointer" }}/>
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
                <div className="flex justify-end"><Button className="px-9">Худалдан авах</Button></div>
            </div>
        </div>
    )
}