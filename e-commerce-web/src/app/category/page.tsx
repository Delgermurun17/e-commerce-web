"use client"
import Categories from "@/components/categories";
import ProductCard from "@/components/productCard";
import { Suspense } from "react";
import { useEffect, useState } from "react";

export interface Product {
  _id: string;
  productName: string,
  productCode: string,
  price: number,
  quantity: number,
  createdAt: string,
  images?: string[]
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  function getProducts() {
    fetch(`https://e-commerce-service-lowygdfni-delgermuruns-projects-8a2d67b5.vercel.app/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="md:px-[14%] px-[5%] grid grid-cols-4 max-w-[1600px] mx-auto gap-2 pt-14 pb-24">
      <div>
        <Suspense>
          <Categories products={products} setProducts={setProducts} />
        </Suspense>
      </div>
      <div className="col-span-3 grid md:grid-cols-3 grid-cols-2 gap-5">
      {products.map((product, index) => (
          <ProductCard key={index} image={product.images?.[0]} name={product.productName} price={product.price} id={product._id}/>
        ))}
      </div>
    </div>
  );
}
