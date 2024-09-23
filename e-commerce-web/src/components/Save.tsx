"use client";

// React болон бусад хэрэгслүүдийг импортлоно
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

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

// Save функцийн компонент
export function Save() {
  // Card-ийн төрлийг удирдах state
  const [cards, setCards] = useState<CardData[]>(initialCardData);
  // Хартны төлөвийг удирдах state
  const [filledCards, setFilledCards] = useState<Set<number>>(new Set());

  // Save count тооцох, одоогоор card-ийн тооноос хамаарна
  const savedCount = cards.length;

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
    <div className="flex flex-col gap-4 items-center py-64">
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
                <p className="font-bold text-sm leading-5">{card.price}</p>
              </div>
              <div>
              <Button className="mt-2 mb-4 w-20 h-7 bg-blue-600 rounded-[14px px-3 py-1">
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
                  fill={filledCards.has(card.id) ? "none" : "black"}
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
