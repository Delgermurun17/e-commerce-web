import { Save } from "@/components/Save";
import Categories from "@/components/categories";
import ProductCard from "@/components/productCard";

export default function Home() {
  return (
    <main>
      <Save />
      {/* <ProductCard/>  */}
      <Categories/>
    </main>
  );
}
