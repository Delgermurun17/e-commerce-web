"use client";
// React болон бусад хэрэгслүүдийг импортлоно
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

// Card-ийн өгөгдлийн бүтэц тодорхойлох
interface CardData {
  id: number;  // Card-ийн давтагдашгүй ID
  title: string;  // Card-ийн нэр
  price: string;  // Card-ийн үнэ
}

// Эхний card-ийн өгөгдөл
const initialCardData: CardData[] = [
  { id: 1, title: "Chunky Glyph Tee", price: "120,000₮" },
  { id: 2, title: "Doodle Hoodie", price: "230,000₮" },
  { id: 3, title: "Local Styles Crewneck", price: "350,000₮" },
];

export function Save() {
  const [cards, setCards] = useState<CardData[]>(initialCardData);
  const [filledCards, setFilledCards] = useState<Set<number>>(new Set());

  const savedCount = cards.length;

  useEffect(() => {
    // Save the savedCount to localStorage
    localStorage.setItem('savedCount', JSON.stringify(savedCount));
    window.dispatchEvent(new Event('storageChange'));
  }, [savedCount]);

  // Хартны товчлуур дарсан үед гүйцэтгэх үйлдэл
  const handleHeartClick = (id: number) => {
    setFilledCards((prev) => {
      const newSet = new Set(prev);
      // Хартны төлөвийг сольж, card-ийн идэвхжсэн эсэхийг шалгана
      if (newSet.has(id)) {
        newSet.delete(id);  // Card идэвхжсэн байвал устгана
      } else {
        newSet.add(id);  // Card идэвхжээгүй бол нэмнэ
      }
      return newSet;
    });

    // Card-ыг анимацины дараа устгана
    setTimeout(() => {
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }, 700);  // Анимацийн хугацаатай тохируулах
  };

  return (
    <div className="flex flex-col gap-4 items-center pt-36 h-[1000px]">
      <div className="mr-[420px]">
        <h1 className="font-bold text-xl leading-7">
          Хадгалсан бараа <span className="text-zinc-600 font-medium">({savedCount})</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 max-w-[622px] w-full">
        {/* Card-уудыг гаргах */}
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex gap-6 p-4 h-[132px] rounded-2xl border border-gray-200 duration-700 overflow-hidden bg-white ${
              filledCards.has(card.id) ? "opacity-0 h-0" : "opacity-100 h-[132px]"
            }`}
            style={{
              transition: "height 0.7s ease-out, opacity 0.7s ease-out",
            }}
          >
            <Image src={"/card.png"} alt="card" width={100} height={100} className="rounded-xl"></Image>
            <div className="flex flex-col w-[402px]">
              <div className="gap-1 text-black">
                <h1 className="font-normal text-base leading-6">{card.title}</h1>
                <p className="font-bold text-sm leading-5">{card.price}</p>
              </div>
              <div>
                <Button className="mt-2 mb-4 w-20 h-7 bg-blue-600 rounded-[14px] px-3 py-1">
                  <p className="font-medium text-sm leading-5 text-white">Сагслах</p>
                </Button>
              </div>
            </div>
            <div>
              <button
                aria-label="Save"
                onClick={() => handleHeartClick(card.id)}
                aria-pressed={filledCards.has(card.id)}
                className="focus:outline-none"
              >
                <Heart
                  className="duration-700"
                  fill={filledCards.has(card.id) ? "transparent" : "black"}
                  color="black"
                  style={{ cursor: "pointer" }}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  