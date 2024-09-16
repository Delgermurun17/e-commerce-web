"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Userpage() {
  const [activeSection, setActiveSection] = useState("Хэрэглэгчийн хэсэг");
  const [isOrderVisible1, setOrderVisible1] = useState(false);
  const [isOrderVisible2, setOrderVisible2] = useState(false);

  const orders = [
    {
      id: 1,
      name: "Chunky Glyph Tee",
      quantity: 1,
      price: 120000,
    },
    {
      id: 2,
      name: "Sleek Logo Hoodie",
      quantity: 2,
      price: 120000,
    },
    {
      id: 3,
      name: "Vintage Cap",
      quantity: 1,
      price: 120000,
    },
    {
      id: 4,
      name: "Classic Jeans",
      quantity: 1,
      price: 120000,
    },
  ];

  const toggleOrderVisibility1 = () => {
    setOrderVisible1(!isOrderVisible1);
  };

  const toggleOrderVisibility2 = () => {
    setOrderVisible2(!isOrderVisible2);
  };

  const totalAmount = orders.reduce((sum, order) => sum + order.quantity * order.price, 0);

  return (
    <div className="bg-gray-100 py-16 px-48">
      <div className="flex gap-5 mt-16">
        <div className="flex flex-col gap-1">
          <div
            className={`${
              activeSection === "Хэрэглэгчийн хэсэг" ? "bg-white" : "bg-gray-100"
            } w-[244px] rounded-2xl`}
          >
            <button
              onClick={() => setActiveSection("Хэрэглэгчийн хэсэг")}
              className="text-left hover:underline font-medium text-sm leading-5 py-2 pl-4 w-full"
            >
              Хэрэглэгчийн хэсэг
            </button>
          </div>
          <div
            className={`${
              activeSection === "Захиалгын түүх" ? "bg-white" : "bg-gray-100"
            } w-[244px] rounded-2xl`}
          >
            <button
              onClick={() => setActiveSection("Захиалгын түүх")}
              className="text-left hover:underline font-medium text-sm leading-5 py-2 pl-4 w-full"
            >
              Захиалгын түүх
            </button>
          </div>
        </div>

        <div className="w-full max-w-[620px]">
          <p className="font-bold text-lg leading-7">{activeSection}</p>
          <div className="py-7">
            <hr />
          </div>

          {activeSection === "Хэрэглэгчийн хэсэг" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="surname" className="font-medium leading-[14px] text-sm">
                  Овог:
                </label>
                <input id="surname" className="h-7 rounded-2xl border border-zinc-200 focus:ring-green" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium leading-[14px] text-sm">
                  Нэр:
                </label>
                <input id="name" className="h-7 rounded-2xl border border-zinc-200" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-medium leading-[14px] text-sm">
                  Утасны дугаар:
                </label>
                <input id="phone" className="h-7 rounded-2xl border border-zinc-200" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium leading-[14px] text-sm">
                  Имэйл хаяг:
                </label>
                <input id="email" className="h-7 rounded-2xl border border-zinc-200" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="font-medium leading-[14px] text-sm">
                  Хаяг:
                </label>
                <input id="address" className="h-24 rounded-2xl border border-zinc-200" />
              </div>
              <div className="flex justify-end">
                <Button className="w-[212px] hover:bg-gray-800">Мэдээлэл шинэчлэх</Button>
              </div>
            </div>
          )}

          {activeSection === "Захиалгын түүх" && (
            <div className="flex flex-col gap-4">
              <div className="w-full max-w-[620px] bg-white py-8 px-6 rounded-2xl">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                  <div className="flex gap-2">
                    <h1 className="font-bold text-base leading-6">2024-09-03 15:34</h1>
                    <Button className="py-[2px] px-3 hover:bg-gray-800">хүргэлтэнд гарсан</Button>
                  </div>
                  <div>
                    <button onClick={toggleOrderVisibility1}>
                      {isOrderVisible1 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
                {isOrderVisible1 && (
                  <>
                    {orders.map((order) => (
                      <div key={order.id} className="flex gap-4 mt-4">
                        <div className="w-9 h-9 bg-slate-500"></div>
                        <div className="flex flex-col flex-grow">
                          <p className="font-normal text-xs leading-4">{order.name}</p>
                          <div className="flex justify-between w-full">
                            <p className="font-normal text-xs leading-4">
                              {order.quantity} x {order.price.toLocaleString()}₮
                            </p>
                            <p className="font-bold text-xs leading-4">
                              {(order.quantity * order.price).toLocaleString()}₮
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <hr className="dashed my-4" />
                    <div className="flex w-full justify-between">
                      <p className="font-normal text-base leading-6">Үнийн дүн:</p>
                      <p className="font-bold text-lg leading-7">{totalAmount.toLocaleString()}₮</p>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full max-w-[620px] bg-white py-8 px-6 rounded-2xl">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                  <div className="flex gap-2">
                    <h1 className="font-bold text-base leading-6">2024-09-03 15:34</h1>
                    <Button className="py-[2px] px-3 hover:bg-gray-800">дууссан</Button>
                  </div>
                  <div>
                    <button onClick={toggleOrderVisibility2}>
                      {isOrderVisible2 ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
                {isOrderVisible2 && (
                  <div className="flex w-full justify-between">
                    <div className="font-normal text-base leading-6">Үнийн дүн:</div>
                    <div className="font-bold text-lg leading-7">120,000₮</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
