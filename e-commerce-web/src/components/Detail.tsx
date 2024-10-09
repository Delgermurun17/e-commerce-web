"use client"; // Next.js-т хэрэглэгчийн интерфэйсийг ашиглахын тулд зарладаг

import { Heart, Star } from "lucide-react"; // Lucide React-с Heart болон Star иконуудаа импортолдог
import { useEffect, useState } from "react"; // React-н useEffect болон useState hook-ийг импортолдог
import { Button } from "./ui/button"; // UI компонентийг импортолдог
import ProductCard from "./productCard"; // ProductCard компонентийг импортолдог

export const Detail = () => {
  const price = 120000; // Барааны үнэ

  // Барааны зурагны массив
  const photos = [
    { photo: "p1" },
    { photo: "p2" },
    { photo: "p3" },
    { photo: "p4" },
  ];

  // Сонгогдсон зургийг хадгалах state
  const [selectedPhoto, setSelectedPhoto] = useState("p1");
  // Сонгогдсон хэмжээ
  const [selectedSize, setSelectedSize] = useState("");
  // Хадгалсан эсэх
  const [isSaved, setIsSaved] = useState(false);
  // Тоо
  const [number, setNumber] = useState(1);

  // Барааны хэмжээ, хувь
  const product = [
    { size: "S", stock: 19 },
    { size: "M", stock: 5 },
    { size: "L", stock: 3 },
    { size: "XL", stock: 10 },
    { size: "2XL", stock: 0 },
  ];

  // Анхны хэмжээ
  const defaultSize = product.find((pr) => pr.stock > 0)?.size || "";
  // Одоо байгаа нөөц
  const currentStock = product.find((p) => p.size === selectedSize)?.stock || 0;

  // Хэрэглэгчийн үнэлгээ болон сэтгэгдлийг хадгалах state
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState<
    { name: string; rating: number; comment: string }[]
  >([]);

  // Сэтгэгдлүүдийг харуулах эсэх
  const [showComments, setShowComments] = useState(true);
  // Харагдаж буй сэтгэгдлийн тоог хадгалах
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(1);

  // Одоо байгаа нөөц 0 болсон үед хэмжээ болон тоог тохируулах
  useEffect(() => {
    if (currentStock === 0) {
      const availableSize = product.find((p) => p.stock > 0)?.size || "";
      setSelectedSize(availableSize);
      setNumber(0);
    }
  }, [currentStock, product]);

  // Тоог нэмэх функц
  const incrementNumber = () => {
    setNumber((prevNumber) =>
      prevNumber < currentStock ? prevNumber + 1 : prevNumber
    );
  };

  // Тоог багасгах функц
  const decrementNumber = () => {
    setNumber((prevNumber) => (prevNumber > 1 ? prevNumber - 1 : prevNumber));
  };

  // Нийт үнийг тооцоолох
  const totalPrice = price * number;

  // Сэтгэгдэл илгээх функц
  const handleSubmit = () => {
    if (userRating > 0 && userComment.trim()) {
      const newComment = {
        name: "User",
        rating: userRating,
        comment: userComment.trim(),
      };
      setComments((prev) => [newComment, ...prev]); // Шинэ сэтгэгдлийг нэмэх
      setUserRating(0); // Үнэлгээг дахин тохируулах
      setUserComment(""); // Сэтгэгдлийг дахин тохируулах
    }
  };

  // Дундаж үнэлгээг тооцоолох функц
  const averageRating = () => {
    if (comments.length === 0) return 0;
    const total = comments.reduce((sum, com) => sum + com.rating, 0);
    return parseFloat((total / comments.length).toFixed(1));
  };

  // Сэтгэгдлүүдийг харах нэмэлт функц
  const handleSeeMoreComments = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 5); // 5-гаар нэмэх
  };

  // UI-ийг буцаах
  return (
    <div className="w-[1040px] mx-auto flex flex-col gap-20 mt-14 mb-24">
      {/* Зургийн хэсэг */}
      <div className="flex gap-5">
        {/* Зургийн товчлуурын хэсэг */}
        <div className="w-[67px] h-[392px] grid gap-2 pt-[100px]">
          {photos.map((p) => (
            <div
              className={`size-[67px] rounded ${
                selectedPhoto === p.photo ? "border border-black" : ""
              }`}
              onClick={() => setSelectedPhoto(p.photo)}
              key={p.photo}
            >
              {p.photo} {/* Зургийг харуулна */}
            </div>
          ))}
        </div>
        {/* Сонгосон зургийг харуулах хэсэг */}
        <div className="w-[422px] h-[521px] rounded-2xl border-[2px] border-black text-center content-center text-5xl">
          {selectedPhoto}
        </div>
        {/* Барааны мэдээлэл */}
        <div className="pt-[100px] flex flex-col gap-[55px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-xs leading-4 border border-blue-600 p-1 w-14 text-center rounded-2xl">
                  шинэ {/* Шинэ гэж тэмдэглэсэн */}
                </div>
                <div className="flex gap-2 items-center">
                  <div className="font-bold text-2xl leading-8">
                    Wildflower Hoodie {/* Барааны нэр */}
                  </div>
                  <div className="size-10 flex justify-center items-center">
                    <Heart
                      onClick={() => setIsSaved((x) => !x)} // Хадгалах функц
                      strokeWidth={1}
                      fill={`${isSaved ? "black" : "transparent"}`}
                      className="duration-500"
                    />
                  </div>
                </div>
                <div className="font-normal text-base leading-6">
                  Зэрлэг цэцгийн зурагтай даавуун материалтай цамц{" "}
                  {/* Барааны тайлбар */}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-normal text-sm leading-5">
                  Хэмжээний заавар {/* Хэмжээний заавар */}
                </div>
                <div className="flex gap-1">
                  {product.map((pr) => (
                    <div
                      onClick={() => {
                        if (pr.stock > 0) {
                          setSelectedSize(pr.size); // Хэмжээг сонгох
                          setNumber(1); // Хэмжээг сольсон үед 1 болгож тохируулах
                        }
                      }}
                      className={`size-8 rounded-full border border-black cursor-pointer font-normal text-xs text-center content-center ${
                        selectedSize === pr.size
                          ? "bg-black text-white duration-500"
                          : "duration-300"
                      } ${
                        pr.stock === 0
                          ? "bg-[#E4E4E7] opacity-50 text-black cursor-not-allowed"
                          : ""
                      }`}
                      key={pr.size}
                    >
                      {pr.size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-1">
                <div
                  onClick={decrementNumber}
                  className="size-8 rounded-full border border-black cursor-pointer text-center content-center"
                >
                  - {/* Тоог багасгах */}
                </div>
                <div className="size-8 text-center content-center text-xs font-normal outline-none">
                  {number} {/* Одоогийн тоо */}
                </div>
                <div
                  onClick={incrementNumber}
                  className="size-8 rounded-full border border-black cursor-pointer text-center content-center"
                >
                  + {/* Тоог нэмэх */}
                </div>
              </div>
            </div>
<<<<<<< HEAD
            <div className="flex flex-col gap-6 ">
            <h1 className="font-bold text-3xl leading-9">Холбоотой бараа</h1>
              <div className="grid grid-cols-4 mx-auto gap-5 mb-24">
              {[...Array(8)].map((_, index) => (
               <ProductCard key={index} className="w-[244px]" id={""}/>
               ))}
=======
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold tracking-wide flex">
                {totalPrice} {/* Нийт үнэ */}
                <div>₮</div>
>>>>>>> 4e9d49cb5e1aaa6da4703e896911172063d6cfa6
              </div>
              <Button
                className="cursor-pointer w-[175px]"
                disabled={currentStock === 0} // Нөөцгүй үед товчлуурыг идэвхгүй болгох
              >
                Сагсанд нэмэх {/* Сагсанд нэмэх */}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-[551px] ">
            <div>
              <div className="flex gap-4 text-sm font-normal">
                <div>Үнэлгээ</div>
                <div
                  className="cursor-pointer text-[#2563EB] border-b border-[#2563EB]"
                  onClick={() => setShowComments((prev) => !prev)} // Сэтгэгдлийг харах/нуух функц
                >
                  {showComments ? "бүгдийг харах" : "бүгдийг хураах"}
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    fill={index < averageRating() ? "gold" : "gray"} // Дундаж үнэлгээг харуулах
                    stroke=""
                  />
                ))}
                <span className="ml-2">
                  {averageRating()} ({comments.length}){" "}
                  {/* Дундаж үнэлгээ болон сэтгэгдлийн тоо */}
                </span>
              </div>
            </div>
            {!showComments &&
              comments.slice(0, visibleCommentsCount).map((com, index) => (
                <div key={index}>
                  <div
                    className={`grid gap-1 text-sm font-normal border-t ${
                      index === 0
                        ? "border-none"
                        : "border-dashed border-gray-300 pt-4"
                    }`}
                  >
                    <div className="flex gap-1">
                      {com.name} {/* Хэрэглэгчийн нэр */}
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < com.rating ? "gold" : "gray"} // Сэтгэгдлийн үнэлгээ
                            stroke=""
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[#71717A]">{com.comment}</div>{" "}
                    {/* Сэтгэгдэл */}
                  </div>
                </div>
              ))}

            {!showComments && (
              <div className="bg-[#F4F4F5] p-6 rounded-2xl h-[294px] text-sm font-normal">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="leading-[14px]">Одоор үнэлэх:</div>{" "}
                    {/* Үнэлгээ хийх хэсэг */}
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          fill={index < userRating ? "gold" : "gray"} // Хэрэглэгчийн үнэлгээ
                          onClick={() => setUserRating(index + 1)} // Үнэлгээ сонгох
                        />
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Таны сэтгэгдэл" // Сэтгэгдлийн оруулгын хэсэг
                    className="p-2 border border-gray-400 rounded h-24"
                    value={userComment} // Одоо байгаа сэтгэгдэл
                    onChange={(e) => setUserComment(e.target.value)} // Сэтгэгдлийг хадгалах
                  />
                  <div className="flex gap-4">
                    <Button onClick={handleSubmit} className="w-[175px]">
                      Илгээх {/* Сэтгэгдэл илгээх */}
                    </Button>
                    {/* Бусад сэтгэгдлүүдийг харах товчлуур */}
                    {!showComments &&
                      visibleCommentsCount < comments.length && (
                        <Button onClick={handleSeeMoreComments}>
                          Бүх сэтгэгдэлийг харах ! {/* Бүх сэтгэгдлийг харах */}
                        </Button>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Холбоотой бараануудын хэсэг */}
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-3xl leading-9">Холбоотой бараа</h1>
        <div className="grid grid-cols-4 mx-auto gap-5 mb-24">
          {[...Array(8)].map((_, index) => (
            <ProductCard key={index} className="w-[244px]" /> // Холбоотой бараа
          ))}
        </div>
      </div>
    </div>
  );
};
