"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast, Toaster } from "sonner";

interface GeneralProps {
    save: () => void;
    step: string;
    setStep: (step: string) => void;
}

async function fetcher(pathname: string) {
    const token = localStorage.getItem("authtoken") || "";
  
    const response = await fetch(`http://localhost:4000${pathname}`, {
        headers: {
            authtoken: token,
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
}

export function General({ save, step, setStep }: GeneralProps) {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<{ _id?: string; email?: string; phoneNumber?: string; password?: string } | null>(null);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await fetcher("/user");
                setUser(data);
            } catch (error) {
            }
        };
        fetchUser();
    }, []);

    const updateUser = async () => {
        if (!user?._id) return;

        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}`, {
                method: "PUT",
                body: JSON.stringify({ email, phoneNumber, password }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            toast("Successfully changed.");
        } catch (error) {
            toast.error('Error updating user data');
        }
    };

    return (
        <div className="font-medium">
            {step === "1" && 
                <div className="flex flex-col gap-10">
                    <div>Имэйл хаяг солих</div>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        id="email" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" 
                    />
                    <div className="flex gap-2">
                    <Button onClick={save}>Буцах</Button>
                    <Button onClick={() => {
                        updateUser();
                        save();
                    }}>Имэйл хаяг солих</Button> </div>
                </div>
            }
            {step === "2" && 
                <div className="flex flex-col gap-10">
                    <div>Утасны дугаар солих</div>
                    <input 
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        type="number" 
                        id="phoneNumber" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" 
                    />
                    <div className="flex gap-2">
                    <Button onClick={save}>Буцах</Button>
                    <Button onClick={() => {
                        updateUser();
                        save();
                    }}>Утасны дугаар солих</Button> </div>
                </div>
            }
            {step === "3" && 
                <div className="flex flex-col gap-10">
                    <div>Нууц үг солих</div>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id="password" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" 
                    />
                    <div className="flex gap-2">
                    <Button onClick={save}>Буцах</Button>
                    <Button onClick={() => {
                        updateUser();
                        save();
                    }}>Нууц үг солих</Button> </div>
                </div>
            }
            {step === "4" && 
                <div className="flex flex-col gap-10">
                    <div>Бүртэл устгах</div>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id="password" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black" 
                    />
                    <Button onClick={save}>Бүртэл устгах</Button>
                </div>
            }
            <Toaster />
        </div>
    );
}
