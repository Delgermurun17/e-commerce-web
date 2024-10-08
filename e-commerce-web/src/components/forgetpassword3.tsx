"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Toaster, toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";


export default function ForgetPassword4() {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const ShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    const ShowPasswordConfirm = () => {
        setShowPasswordConfirm((prev) => !prev);
    };

    console.log({  password, passwordConfirm });

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>-_+=]/.test(password);
    const passwordsAreSame = password === passwordConfirm && password !== "";
    const passwordValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar

    const [passwordEmpty, setPasswordEmpty] = useState(false)
    const [passwordLengthConfrim, setPasswordlenghtConfrim] = useState(false)
    const [passwordValidConfirm, setPasswordValidConfirm] = useState(false)
    const [passwordConfirmEmpty, setPasswordConfirmEmpty] = useState(false)
    function reset() {

        setPasswordEmpty(false)
        setPasswordlenghtConfrim(false)
        setPasswordValidConfirm(false)
        setPasswordValidConfirm(false)
        setPassword("")
        setPasswordConfirm("")
    }

    function final() {
        if (!password) return setPasswordEmpty(true)
        if (password.length < 8) return setPasswordlenghtConfrim(true)
        if (!passwordValid) return setPasswordValidConfirm(true)
        if (!passwordConfirm) return setPasswordConfirmEmpty(true)
        // return submit()
    }

    // function submit() {
    //     fetch("http://localhost:4000/register", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             name,
    //             email,
    //             password,
    //         }),
    //         headers: {
    //             "Content-type": "Application/json; charset=UTF-8",
    //         }
    //     }).then((res) => {
    //         if (!res.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return res.json();
    //     })
    //         .then(() => {
    //             toast.success("Амжилттай шинэчиллээ.", { className: 'custom-toast success' });
    //             reset()
    //             setTimeout(() => {
    //                 window.location.href = "/login";
    //             }, 2000);
    //         })
           
    // }
    const customToast = {
        success: "custom-toast success",
        error: "custom-toast error",
    };



    return (
        <div className="flex flex-col gap-6 items-center">
            <div className="py-2 font-medium text-2xl">Шинэ нууц сэргээх</div>
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1 relative">
                        <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black" type={showPassword ? 'text' : 'password'} placeholder="Шинэ нууц үг" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {password && (showPassword ? <Eye size={16} onClick={ShowPassword} className="absolute right-3 top-2.5 text-sm cursor-pointer" /> : <EyeOff size={16} onClick={ShowPassword} className="absolute right-3 top-2.5 text-sm cursor-pointer" />)}
                        {passwordEmpty && (!password ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг оруулна уу</div> : null)}
                        {password && passwordLengthConfrim && (password.length < 8 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг богино байна</div> : null)}
                        {passwordValidConfirm && (!passwordValid ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг шаардлага хангахгүй байна</div> : null)}
                    </div>
                    <div className="flex flex-col gap-1 relative">
                        <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px] outline-none focus:border-black" type={showPasswordConfirm ? 'text' : 'password'} placeholder="Шинэ нууц үг давтах" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        {passwordConfirm && (showPasswordConfirm ? <Eye onClick={ShowPasswordConfirm} className="absolute right-3 top-2.5 text-sm cursor-pointer" size={16} /> : <EyeOff onClick={ShowPasswordConfirm} className="absolute right-3 top-2.5 text-sm cursor-pointer" size={16} />)}
                        {passwordConfirm && (!passwordsAreSame ? <div className="px-3 text-[#E11D48] text-xs font-normal">Давтсан нууц үг буруу байна</div> : null)}
                        {passwordConfirmEmpty && (!passwordConfirm ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг давтаж оруулна уу</div> : null)}
                    </div>
                    <ul className="flex flex-col gap-1 list-disc font-normal text-xs leading-4 pl-3">
                        <li className={`${!password ? "!text-[#71717A]" : ""} ${hasUppercase ? "text-green-600" : "text-red-600"}`}>Том үсэг орсон байх</li>
                        <li className={`${!password ? "!text-[#71717A]" : ""} ${hasLowercase ? "text-green-600" : "text-red-600"}`}>Жижиг үсэг орсон байх</li>
                        <li className={`${!password ? "!text-[#71717A]" : ""} ${hasNumber ? "text-green-600" : "text-red-600"}`}>Тоо орсон байх</li>
                        <li className={`${!password ? "!text-[#71717A]" : ""} ${hasSpecialChar ? "text-green-600" : "text-red-600"}`}>Тэмдэгт орсон байх</li>
                    </ul>
                    <Button onClick={final} className="w-[334px]" type="submit">
                        Үүсгэх
                    </Button>
                </div>
            </div>
            <Toaster />
        </div>
    );
}