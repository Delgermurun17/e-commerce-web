import PaymentSection from "@/components/PaymentSection";

import Header from "@/components/Header";
import CarouselPlugin from "@/components/carousel";
import ProductCard from "@/components/productCard";


export default function Home() {
  return (
    <main>
      <PaymentSection/>
     <Header/> 
    </main>
      <div className="md:px-[14%] px-[5%] max-w-[1600px] mx-auto pt-[5%] mb-4">
        <CarouselPlugin/>
      </div>

      <div className="grid grid-cols-4 md:px-[14%] px-[5%] max-w-[1600px] mx-auto gap-4 ">
        {[...Array(18)].map((_, index: number) => (
          <ProductCard key={index} className={index === 6 || index === 7 ? ` col-span-2 row-span-2` : ``} />
        ))}
      </div>
      <Userpage />
      <Save />
      {/* <ProductCard/>  */}
          </main>

  );
}
