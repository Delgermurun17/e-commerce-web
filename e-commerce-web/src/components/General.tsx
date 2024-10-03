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
    const [confirmMethod, setConfirmMethod] = useState("")
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

    const checkMethod = async () => {
        if (!confirmMethod) return toast.error("Confirm is required!");
    
        const token = localStorage.getItem("authtoken") || ""; // Get the auth token
        const userId = user?._id; // Get the user ID from state
    
        // Construct headers conditionally
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            authtoken: token,
        };
    
        // Only add userid if it exists
        if (userId) {
            headers['userid'] = userId;
        }
    
        try {
            const res = await fetch("http://localhost:4000/method", {
                method: "POST",
                body: JSON.stringify({ password: confirmMethod }),
                headers,
            });
            
            if (res.ok) {
                updateEmail();
                save()
            } else if (res.status === 401) {
                toast.error("Нууц үг буруу байна.");
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "An unexpected error occurred.");
            }
        } catch (error) {
            toast.error('Error while checking method: ');
        }
    };
    
    

    const updateEmail = async () => {
        if (!user?._id) return;

        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}`, {
                method: "PUT",
                body: JSON.stringify({ email }),
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
    const updatePhoneNumber = async () => {
        if (!user?._id) return;

        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}`, {
                method: "PUT",
                body: JSON.stringify({ phoneNumber }),
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
    const updatePassword = async () => {
        if (!user?._id) return;

        try {
            const response = await fetch(`http://localhost:4000/user/${user._id}`, {
                method: "PUT",
                body: JSON.stringify({ password }),
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
                <div className="flex flex-col gap-8">
                    <div>Имэйл хаяг солих</div>
                    <div><p>Нууц үгээ оруулна уу</p>
                    <input 
                        onChange={(e) => setConfirmMethod(e.target.value)} 
                        type="password" 
                        id="password" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black w-full mt-1" 
                    /></div>
                    <div><p>Шинэ имэйл хаягаа оруулна уу</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        id="email" 
                        className="h-7 rounded-2xl border border-zinc-200 p-3 outline-none focus:border-black w-full mt-1" 
                    /></div>
                    <div className="flex gap-2">
                    <Button onClick={save}>Буцах</Button>
                    <Button onClick={() => {
                        checkMethod()
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
                        updatePhoneNumber();
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
                        updatePassword();
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
                    <div className="flex gap-2">
                    <Button onClick={save}>Буцах</Button>
                    <Button onClick={save}>Бүртэл устгах</Button></div>
                </div>
            }
            <Toaster />
        </div>
    );
}
