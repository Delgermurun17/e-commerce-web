import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Loading from "./forgetpasswordloader";


interface forgetpassword {
    onNext: () => void;
}

export default function Forgetpassword1 ({ onNext }: forgetpassword) {
    const [loading, setLoading] = useState(false);


    const sendCode = () => {
        try {
            setLoading(true)
            //fetch
            console.log('gmail taarsan')
            // setLoading(false)
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
                        <Input className="border border-none rounded-2xl shadow-md" placeholder="Имэйл хаяг оруулах" />
                        <Button onClick={sendCode}>Илгээх</Button>
                    </>
                }
            </div>
        </div>
    );
}