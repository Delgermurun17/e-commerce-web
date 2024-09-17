"use client";

import { Button } from "./ui/button";

const products = [
  { id: 1, name: "Chunky Glyph Tee", quantity: 5, price: 120000 },
  { id: 2, name: "Minimalist Hoodie", quantity: 2, price: 150000 },
  { id: 3, name: "Classic Denim Jacket", quantity: 1, price: 180000 },
];

export function BuyStepTwo() {
  const totalPrice = products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-5 bg-gray-100 p-[350px] px-[750px]">
      <div className="flex flex-col gap-4 bg-white py-8 px-6 rounded-2xl w-[333px]">
        <div className="font-bold text-lg leading-7">
          Сагс
          <span className="font-normal text-zinc-500">
            &nbsp;({products.length})
          </span>
        </div>
        {products.map((product) => (
          <div key={product.id} className="flex gap-6">
            <div className="w-20 h-20 rounded-2xl bg-slate-400"></div>
            <div className="flex flex-col gap-1">
              <p className="font-normal text-base leading-6">{product.name}</p>
              <p className="font-normal text-xs leading-4">
                {product.quantity} x {product.price.toLocaleString()}₮
              </p>
              <p className="font-bold text-base leading-6">
                {(product.quantity * product.price).toLocaleString()}₮
              </p>
            </div>
          </div>
        ))}
        <hr className="border border-dashed my-6 max-w-[285px]" />
        <div className="flex justify-between">
          <p className="font-normal text-base leading-6">Нийт төлөх дүн:</p>
          <p className="font-bold text-lg leading-7 ">
            {totalPrice.toLocaleString()}₮
          </p>
        </div>
      </div>

      <div className="w-[687px] bg-white p-8 rounded-2xl">
        <div className="font-semibold text-lg leading-7">
          2. Хүргэлтийн мэдээлэл оруулах
        </div>
        <div className="flex flex-col gap-4 py-9">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="surname"
              className="font-medium leading-[14px] text-sm"
            >
              Овог:
            </label>
            <input
              id="surname"
              className="h-7 rounded-2xl border border-zinc-200 p-3"
              aria-label="surname"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="font-medium leading-[14px] text-sm"
            >
              Нэр:
            </label>
            <input
              id="name"
              placeholder="Самбуу"
              className="h-7 rounded-2xl border border-zinc-200 p-3"
              aria-label="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="font-medium leading-[14px] text-sm"
            >
              Утасны дугаар:
            </label>
            <input
              id="phone"
              className="h-7 rounded-2xl border border-zinc-200 p-3"
              aria-label="phone"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="address"
              className="font-medium leading-[14px] text-sm"
            >
              Хаяг:
            </label>
            <input
              id="address"
              className="h-24 rounded-2xl border border-zinc-200 p-3"
              aria-label="address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="additional"
              className="font-medium leading-[14px] text-sm"
            >
              Нэмэлт мэдээлэл:
            </label>
            <input
              id="additional"
              className="h-16 rounded-2xl border border-zinc-200 p-3"
              aria-label="additional information"
            />
          </div>
          <div className="font-normal text-xs leading-5 text-zinc-500">
            Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
          </div>
        </div>

        <div className="flex justify-between">
          <Button className="w-[114px] bg-white hover:bg-zinc-200 text-black border">
            Буцах
          </Button>
          <Button className="w-[212px] hover:bg-gray-800">Төлбөр төлөх</Button>
        </div>
      </div>
    </div>
  );
}
