import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import App from "./forgetpasswordloader";


interface forgetpassword {
    onNext: () => void;
}

export default function ({ onNext }: forgetpassword) {
    const [loading, setLoading] = useState(false);

    const forgetPassword = () => {
        try {
            setLoading(true)
            // fetch
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold text-center">Нууц үг сэргээх</p>
            <div className="w-80 mx-auto flex flex-col gap-6">
                {loading && <App></App>}
                {!loading &&
                    <>
                        <Input className="border border-none rounded-2xl shadow-md" placeholder="Имэйл хаяг оруулах" />
                        <Button onClick={onNext}>Илгээх</Button>
                    </>
                }
            </div>
        </div>
    );
}