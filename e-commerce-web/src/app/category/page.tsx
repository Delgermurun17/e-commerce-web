import Categories from "@/components/categories";
import ProductCard from "@/components/productCard";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="md:px-[14%] px-[5%] grid grid-cols-4 max-w-[1600px] mx-auto gap-2 pt-14 pb-24">
      <div>
        <Suspense>
          <Categories />
        </Suspense>
      </div>
      <div className="col-span-3 grid md:grid-cols-3 grid-cols-2 gap-5">
        {[...Array(15)].map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
}
