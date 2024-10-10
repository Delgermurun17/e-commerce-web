"use client"
import CarouselPlugin from "@/components/carousel";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";

export type Product = {
  _id: string;
  productName: string,
  productCode: string,
  price: number,
  quantity: number,
  createdAt: string,
  images?: string[]
}
export default function Home() {
  const [products, setProducts] = useState<Product[]>([])


  function getProducts() {
    fetch(`https://e-commerce-service-lowygdfni-delgermuruns-projects-8a2d67b5.vercel.app/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main>
      <div className="max-w-[1040px] mx-auto mb-10 pt-14">
        <CarouselPlugin products={products}/>
      </div>

      <div className="grid grid-cols-4 w-[1040px] mx-auto gap-4 mb-24">
        {products.map((product, index) => (
          <ProductCard key={index} className={index === 6 || index === 7 ? ` col-span-2 row-span-2` : ``} image={product.images?.[0]} name={product.productName} price={product.price} id={product._id}/>
        ))}
      </div>
    </main>
  );
}
