"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const ShowPassword = () => {
      setShowPassword((prev) => !prev);
    };
    const [emailConfirm, setEmailConfirm] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState(false)
    function confirm(){
        if(!email) return setEmailConfirm(true)
        if(!password) return setPasswordConfirm(true)
        return submit()
    }

    function submit() {
        fetch("http://localhost:4000/login", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              console.log("error");
            }
          })
          .then(({ accessToken }) => {
            localStorage.setItem("accessToken", accessToken);
            window.location.href = "/";
          });
      }
    
    return (
        <div className=" flex flex-col items-center h-[800px] gap-6 pt-[100px]">
            <div className="py-2 font-medium text-2xl">Нэвтрэх</div>
            <div className="flex">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex flex-col gap-1">                   
                            <input type="email" className={`h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black ${emailConfirm && (!email ? "!border-[#E11D48]" : null)}`} placeholder="Имэйл хаяг" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {emailConfirm && (!email ? <div className="px-3 text-[#E11D48] text-xs font-normal">Имэйл хаяг оруулна уу</div> : null)}
                        </div>
                        <div className="flex flex-col gap-1 relative">
                            <input className={`h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black ${passwordConfirm && (!password ? "!border-[#E11D48]" : null)}`} type={showPassword ? 'text' : 'password'} placeholder="Нууц үг" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {password && (showPassword ? <Eye size={16} onClick={ShowPassword}  className="absolute right-3 top-2.5 text-sm cursor-pointer"/> : <EyeOff size={16} onClick={ShowPassword}  className="absolute right-3 top-2.5 text-sm cursor-pointer"/>)}
                            {passwordConfirm && (!password ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг оруулна уу</div> : null)}
                        </div>
                        <Button onClick={confirm} className="w-[334px]">Нэвтрэх</Button>
                        <Link className="text-sm text-gray-500 border-b-2 w-fit" href={"/"}>Нууц үг мартсан</Link>
                    </div>
                    <Link href={"/signup"}><Button className="w-[334px] bg-white border !border-[#2563EB] text-[#2563EB]">Бүртгүүлэх</Button></Link>
                </div>
            </div>
        </div>
    )
}