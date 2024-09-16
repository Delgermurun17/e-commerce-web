import ProductCard from "@/components/productCard";
export default function Home() {
  return (
    <main>
      <ProductCard />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(15)].map((_, index: number) => (
          <ProductCard key={index} className={index === 7 || index === 8 ? ` col-span-2 row-span-2` : ``} />
        ))}
      </div>

    </main>
  );
}
