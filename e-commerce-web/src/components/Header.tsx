import { Heart, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"


const Header = () => {
    return (
        <main className="flex justify-between max-w-[1440px] p-2 bg-black text-white mx-auto items-center">
            <div className="flex items-center">
                {`<>`}ECOMMERCE
            </div>
            <div className="flex items-center">
                <Input />
            </div>
            <div className="flex gap-3 items-center">
                <Heart strokeWidth={1} />
                <ShoppingCart strokeWidth={1} />
                <button className="outline-blue-800 rounded-full p-2 hover:bg-opacity-80"> haglkgn;kl</button>
                <button className="bg-blue-800 rounded-full p-2 hover:bg-opacity-80">Нэвтрэх</button>
            </div>
        </main>
    )
}

export default Header