import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LogIn() {
    return (
        <div className="bg-slate-50">
            <div className="w-3/4 h-screen mx-auto pt-80 ">
                <p className="font-bold text-center py-2 text-2xl">Нэвтрэх</p>
                <div className="w-80 h-64 mx-auto flex flex-col gap-20  ">
                    <div className="flex flex-col gap-5 items-center">
                        <Input className="rounded-3xl border-none bg-white shadow-lg " placeholder="Имэйл хаяг" />
                        <Input className="rounded-3xl border-none bg-white shadow-lg" placeholder="Нууц үг" />
                        <Button className="w-full hover:bg-blue-400">Нэвтрэх</Button>
                        <Link className="text-sm text-gray-500 border-b-2 w-fit" href={"/"}>Нууц үг мартсан</Link>
                    </div>
                    <Button variant={"outline"} className="w-full rounded-3xl border-blue-800 text-blue-800">Бүртгүүлэх</Button>
                </div>
            </div>
        </div>
    )
}