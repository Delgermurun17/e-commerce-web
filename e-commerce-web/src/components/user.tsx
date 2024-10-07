"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast, Toaster } from "sonner";
import { General } from "./General";

async function fetcher(pathname: string) {
  const token = localStorage.getItem("authtoken") || "";

  const data = await fetch(`http://localhost:4000${pathname}`, {
    headers: {
      authtoken: token,
    },
  }).then((res) => res.json());
  return data;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

function exit(){
  toast(<div className="font-medium text-lg">Бүртэлээс гарлаа.</div>)
  setTimeout(() => {
    localStorage.removeItem("authtoken")
    window.location.href = "/login";
}, 1200);
}

export default function Userpage() {
  const [activeSection, setActiveSection] = useState("Хэрэглэгчийн хэсэг");
  const [isOrderVisible1, setOrderVisible1] = useState(false);
  const [isOrderVisible2, setOrderVisible2] = useState(false);
  const [user, setUser] = useState<User | null>(null); 
  const [change, setChange] = useState(true)
  const [step, setStep] = useState("")
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetcher("/user")
      .then((data: User | User[]) => {
        if (Array.isArray(data)) {
          if (data.length > 0) {
            setUser(data[0]);
          } else {
            setUser(null);
          }
        } else if (data && typeof data === "object") {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  }, []);

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
    <div className="bg-gray-100 pt-[100px] h-[800px] flex justify-center">
      <div className="flex gap-5">
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
          <div
            className={`${
              activeSection === "Ерөнхий тохиргоо" ? "bg-white" : "bg-gray-100"
            } w-[244px] rounded-2xl`}
          >
            <button
              onClick={() => setActiveSection("Ерөнхий тохиргоо")}
              className="text-left hover:underline font-medium text-sm leading-5 py-2 pl-4 w-full"
            >
              Ерөнхий тохиргоо
            </button>
          </div>
        </div>

        <div className="w-[620px]">
          <p className="font-bold text-lg leading-7">{activeSection}</p>
          <div className="py-6">
            <hr />
          </div>
          {user && (
            <div>
              {activeSection === "Хэрэглэгчийн хэсэг" && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="surname" className="font-medium leading-[14px] text-sm">Овог:</label>
                    {!update ? <input disabled id="surname" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" /> : <input id="surname" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-medium leading-[14px] text-sm">Нэр:</label>
                    {!update ? <input disabled value={user.name} id="name" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" /> : <input value={user.name} id="name" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-medium leading-[14px] text-sm">Утасны дугаар:</label>
                    <input disabled value={user.phoneNumber} id="phone" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium leading-[14px] text-sm">Имэйл хаяг:</label>
                    <input disabled value={user.email} id="email" className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="font-medium leading-[14px] text-sm">Хаяг:</label>
                    {!update ? <textarea disabled value={user.address} id="address" className="h-24 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black resize-none" /> : <textarea value={user.address} id="address" className="h-24 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black resize-none" />}
                  </div>
                  <div className="flex justify-end gap-2">
                    {!update ?
                    <><Button onClick={() => setUpdate(true)} className="w-[212px] hover:bg-gray-800">Мэдээлэл шинэчлэх</Button>
                    <Button onClick={exit} className="hover:bg-gray-800">Гарах</Button></> : 
                    <><Button onClick={() => setUpdate(false)} className="w-[212px] hover:bg-gray-800">Шинэчлэх</Button>
                    <Button onClick={() => setUpdate(false)} className="hover:bg-gray-800">Буцах</Button></>}
                  </div>
                </div>
              )}
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
          {activeSection === "Ерөнхий тохиргоо" && (
            <div>
              {change &&  <div className="flex flex-col gap-4 font-medium">
                  <div className=""><button onClick={() => { setChange(false); setStep("1"); }} className="cursor-pointer hover:underline border-black">Имэйл хаяг солих</button></div>
                  <div className=""><button onClick={() => { setChange(false); setStep("2"); }} className="cursor-pointer hover:underline border-black">Утасны дугаар солих</button></div>
                  <div className=""><button onClick={() => { setChange(false); setStep("3"); }} className="cursor-pointer hover:underline border-black">Нууц үг солих</button></div>
                  <div className=""><button onClick={() => { setChange(false); setStep("4"); }} className="cursor-pointer hover:underline border-black">Бүртэл устгах</button></div>
              </div>}
              {!change &&  <General save={() => setChange(true)} step={step} setStep={setStep}/>}
            </div>
          )}
        </div>
      </div>
          <Toaster />
    </div>
  );
}
