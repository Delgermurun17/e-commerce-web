import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import CarouselPlugin from "@/components/carousel";
import ProductCard from "@/components/productCard";

export default function Home() {
  return (
    <main> 
      <div className="md:px-[14%] px-[5%] max-w-[1600px] mx-auto mb-4 pt-14">
        <CarouselPlugin/>
      </div>

      <div className="grid grid-cols-4 md:px-[14%] px-[5%] max-w-[1600px] mx-auto gap-4 mb-24">
        {[...Array(18)].map((_, index: number) => (
          <ProductCard key={index} className={index === 6 || index === 7 ? ` col-span-2 row-span-2` : ``} />
        ))}
      </div>
    </main>
  );
}
