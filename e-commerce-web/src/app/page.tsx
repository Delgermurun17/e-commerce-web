"use client"
import CarouselPlugin from "@/components/carousel";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  interface Product {
    _id: string;
    productName: string,
    productCode: string,
    price: number,
    quantity: number,
    createdAt: string,
    images?: string[]
  }

  function getProducts() {
    fetch(`http://localhost:4000/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <main>
      <div className="max-w-[1040px] mx-auto mb-4 pt-14">
        <CarouselPlugin />
      </div>

      <div className="grid grid-cols-4 w-[1040px] mx-auto gap-4 mb-24">
        {products.map((product, index) => (
          <ProductCard key={index} className={index === 6 || index === 7 ? ` col-span-2 row-span-2` : ``} image={product.images?.[0]} name={product.productName} price={product.price} id={product._id}/>
        ))}
      </div>
    </main>
  );
}
