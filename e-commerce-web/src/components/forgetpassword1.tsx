import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function () {
    return (
        <div>
            <p className="text-2xl font-bold text-center">Нууц үг сэргээх</p>
            <div className="w-80 mx-auto flex flex-col gap-6">
                <Input placeholder="Имэйл хаяг оруулах" className="rounded-full border-nones shadow-md text-zinc-500" />
                <Button className="w-full">Илгээх</Button>
            </div>
        </div>
    );
}