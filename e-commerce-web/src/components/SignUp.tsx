"use client";
 
import { useState } from "react";
import { Button } from "./ui/button";
import { Toaster, toast } from "sonner";
import './styles.css'; // Import your custom styles

 
export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const ShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
 
  console.log({ name, email, password, passwordConfirm });
 
  const lengthGreater = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsAreSame = password === passwordConfirm && password !== "";
  const emailIsValid = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
 
  const passwordValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar

function final(){
    if (!name) return
    if (name.length < 1) return 
    if (emailIsValid) return
    if (!email) return
    if (!password) return
    if (lengthGreater) return
    if (passwordConfirm) return
    if (!passwordValid) return
    return submit
}

function submit() {
    fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-type": "Application/json; charset=UTF-8",
      }
    }).then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        toast.success("Амжилттай бүртгүүллээ.", { className: 'custom-toast success' });
    })
    .catch(() => {
        toast.error("Алдаа гарлаа.", { className: 'custom-toast error' });
    });
    }
    const customToast = {
        success: "custom-toast success",
        error: "custom-toast error",
    };
 
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[800px]">
        <div className="py-2 font-medium text-2xl">Бүртгүүлэх</div>
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]"  placeholder="Нэр" value={name} onChange={(e) => setName(e.target.value)} />
              {!name ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр оруулна уу</div> : null}
              {name.length < 1 ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нэр богино байна</div> : null}
            </div>
            <div className="flex flex-col gap-1">
              <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]" type="email" placeholder="Имэйл хаяг" value={email} onChange={(e) => setEmail(e.target.value)} />
              {!emailIsValid ? <div className="px-3 text-[#E11D48] text-xs font-normal">Зөв имэйл хаяг оруулна уу</div> : null}
              {!email ? <div className="px-3 text-[#E11D48] text-xs font-normal">Имэйл хаяг оруулна уу</div> : null}
            </div>
            <div className="flex flex-col gap-1 relative">
              <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]" type={showPassword ? 'text' : 'password'} placeholder="Нууц үг" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <button  type="button"  onClick={ShowPassword}  className="absolute right-3 top-2 text-sm">
                {showPassword ? 'Нуух' : 'Харуулах'}
              </button>
              {!password ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг оруулна уу</div> : null}
              {!lengthGreater ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг богино байна</div> : null}
              {!passwordValid ? <div className="px-3 text-[#E11D48] text-xs font-normal">Нууц үг шаардлага хангахгүй байна</div> : null}
            </div>
            <div>
              <input className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]" type={showPassword ? 'text' : 'password'} placeholder="Нууц үг давтах" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
              {!passwordsAreSame ? <div className="px-3 text-[#E11D48] text-xs font-normal">Давтсан нууц үг буруу байна</div> : null}
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
 