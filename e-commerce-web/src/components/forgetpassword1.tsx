import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Loading from "./forgetpasswordloader";


interface forgetpassword {
    onNext: () => void;
}

export default function Forgetpassword1 ({ onNext }: forgetpassword) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("")


    const sendCode = async () => {
        try {
            setLoading(true)
            await fetch("http://localhost:4000/generate", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });
            console.log('gmail taarsan')
            setLoading(false)
            //send code
            onNext()
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="flex flex-col gap-6">
            <p className="text-2xl font-bold text-center">Нууц үг сэргээх</p>
            <div className="w-80 mx-auto flex flex-col gap-6">
                {loading ? < Loading /> :
                    <>
                        <input type="email" id="email" className={`h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black`} placeholder="Имэйл хаяг оруулах" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
                        <Button onClick={sendCode}>Илгээх</Button>
                    </>
                }
            </div>
        </div>
    );
}