import { Heart, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
    return (
        <header className="max-w-full p-2 bg-black text-white mx-auto">
            <div className="max-w-[1440px] mx-auto flex justify-between py-3 px-5">
                <div className="flex items-center gap-8">
                    <div className="flex gap-2 items-center">
                        <svg
                            width="32"
                            height="28"
                            viewBox="0 0 32 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            href="/"
                            aria-hidden="true"
                        >
                            <path
                                d="M5.11038 2.72127L0.806264 10.7774C0.269142 11.7856 0 12.8922 0 14.0002C0 15.1084 0.269142 16.2147 0.806264 17.223L5.11038 25.2793C5.9037 26.7673 7.45516 27.6967 9.14352 27.6967H13.7153V25.4145H13.7138C12.8704 25.4145 12.0946 24.9505 11.6979 24.2065L7.39543 16.1488C7.03585 15.4771 6.85665 14.7395 6.85665 14.0002C6.85665 13.2609 7.03585 12.5233 7.39543 11.8518L11.6979 3.794C12.0946 3.0499 12.8704 2.58604 13.7138 2.58604H13.7153V0.303711H9.14352C7.45516 0.303711 5.9037 1.23325 5.11038 2.72127Z"
                                fill="white"
                            />
                            <path
                                d="M31.1937 10.7774L26.8898 2.72133C26.0963 1.23314 24.545 0.30377 22.8567 0.30377H18.2847V2.58593H18.2864C19.1298 2.58593 19.9055 3.04996 20.3021 3.79389L24.6046 11.8517C24.9643 12.5233 25.1432 13.261 25.1432 14.0002C25.1432 14.7395 24.9643 15.4772 24.6046 16.1488L20.3021 24.2064C19.9055 24.9505 19.1298 25.4144 18.2864 25.4144H18.2847V27.6967H22.8567C24.545 27.6967 26.0963 26.7674 26.8898 25.2792L31.1937 17.2231C31.7307 16.2148 32 15.1083 32 14.0002C32 12.8922 31.7307 11.7857 31.1937 10.7774Z"
                                fill="white"
                            />
                        </svg>
                        <p className="text-sm">ECOMMERCE</p>
                    </div>
                    <button className="text-slate-300 text-sm">Ангилал</button>
                </div>
                <div className="flex items-center rounded-full bg-zinc-900 border-none px-4 w-[300px]">
                    <Search />
                    <Input
                        type="search"
                        placeholder="Бүтээгдэхүүн хайх"
                        className="border-none text-zinc-500"
                    />
                </div>
                <div className="flex gap-5 items-center">
                    <div className="gap-6 flex">
                        <Heart className="relative" strokeWidth={1} />
                        <ShoppingCart strokeWidth={1} />
                    </div>
                    <div className="flex gap-2">
                        <button className="rounded-full p-2 hover:bg-opacity-80 border border-blue-900 hover:opacity-80">
                            Бүртгүүлэх
                        </button>
                        <button className="bg-blue-600 rounded-3xl p-2 hover:bg-blue-500 px-4">
                            Нэвтрэх
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;