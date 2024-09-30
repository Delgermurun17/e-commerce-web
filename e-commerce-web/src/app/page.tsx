import CarouselPlugin from "@/components/carousel";
import ProductCard from "@/components/productCard";

export default function Home() {
  return (
    <main> 
      <div className="max-w-[1040px] mx-auto mb-4 pt-14">
        <CarouselPlugin/>
      </div>

      <div className="grid grid-cols-4 w-[1040px] mx-auto gap-4 mb-24">
        {[...Array(18)].map((_, index: number) => (
          <ProductCard key={index} className={index === 6 || index === 7 ? ` col-span-2 row-span-2` : ``} />
        ))}
      </div>
    </main>
  );
}
