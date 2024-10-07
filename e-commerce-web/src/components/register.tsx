"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { CircleAlert } from "lucide-react";

// Бүртгэлтэй функц
export function Register() {
  const [password, setPassword] = useState<string>(""); // Нууц үг
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Давтах нууц үг
  const [requirements, setRequirements] = useState<{
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  }>({
    hasUpperCase: true,
    hasLowerCase: true,
    hasNumber: true,
    hasSpecialChar: true,
  });
  const [showError, setShowError] = useState<boolean>(false); // Алдааг харуулах

  // Нууц үгийн шалгалт
  const validatePassword = (pwd: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(pwd); // Том үсэг шалгах
    const hasLowerCase = /[a-z]/.test(pwd); // Жижиг үсэг шалгах
    const hasNumber = /\d/.test(pwd); // Тоо шалгах
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd); // Тэмдэгт шалгах

    setRequirements({
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    });

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar; // Бүх шаардлага хангасан эсэх
  };

  // Нууц үгийг өөрчлөх функц
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const pwd = e.target.value;
    setPassword(pwd);
    validatePassword(pwd);
  };

  // Давтах нууц үгийг өөрчлөх функц
  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
  };

  // Давтах нууц үг үнэн эсэх
  const isConfirmPasswordValid = confirmPassword === password;

  // Формыг илгээх функц
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validatePassword(password) || !isConfirmPasswordValid) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // Амжилттай бүртгүүлэх логик энд байна
  };

  return (
    <div className="w-[1040px] mx-auto">
      <h1 className="text-center font-semibold text-2xl leading-8 mt-24">
        Бүртгүүлэх
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-6 gap-4 pb-[150px]"
      >
        <input
          id="name"
          placeholder="Нэр"
          className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]"
          aria-label="name"
        />
        <div>
          <input
            id="email"
            placeholder="Имэйл хаяг"
            className="h-9 rounded-2xl border border-zinc-200 p-3 w-[334px]"
            aria-label="email"
          />
          <p className="text-red-500 pl-3 pb-1 font-normal text-xs">
            Зөв имэйл хаяг оруулна уу
          </p>
        </div>
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={handlePasswordChange}
          className={`h-9 rounded-2xl border ${
            Object.values(requirements).every((req) => req)
              ? "border-zinc-200"
              : "border-red-500"
          } p-3 w-[334px]`}
          aria-label="password"
        />
        <div>
          <input
            type="password"
            placeholder="Нууц үг давтах"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`h-9 rounded-2xl border ${
              isConfirmPasswordValid ? "border-zinc-200" : "border-red-500"
            } p-3 w-[334px]`}
            aria-label="confirm password"
          />
          {!isConfirmPasswordValid && (
            <p className="text-red-500 pl-3 pb-3 font-normal text-sm">
              Нууц үг ижил биш байна
            </p>
          )}
          <ul className="list-disc font-normal text-xs leading-4 pl-3 gap-1">
            <li
              className={`${requirements.hasUpperCase ? "" : "text-red-500"}`}
            >
              Том үсэг орсон байх
            </li>
            <li
              className={`${requirements.hasLowerCase ? "" : "text-red-500"}`}
            >
              Жижиг үсэг орсон байх
            </li>
            <li className={`${requirements.hasNumber ? "" : "text-red-500"}`}>
              Тоо орсон байх
            </li>
            <li
              className={`${requirements.hasSpecialChar ? "" : "text-red-500"}`}
            >
              Тэмдэгт орсон байх
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-12">
          <Button className="w-[334px]" type="submit">
            Үүсгэх
          </Button>
          <Button className="w-[334px] bg-white text-blue-600 border border-blue-600 hover:bg-slate-100">
            Нэвтрэх
          </Button>
        </div>
      </form>
      {showError && (
        <div className="w-[512px] border border-red-600 rounded-xl mb-8 ml-[920px]">
          <div className="py-4 pl-11 flex flex-col gap-1">
            <div className="flex gap-1">
              <CircleAlert className="w-4 h-4" color="red" />
              <p className="font-medium text-base leading-4 text-red-500">
                Алдаа гарлаа
              </p>
            </div>
            <p className="font-normal text-sm leading-5 text-red-500">
              Нууц үг ба давтах нууц үг нь шаардлага хангахгүй байна.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// useState: Эдгээр нь компонентийг өөрчлөх үед байнгын утгуудыг хадгалахад хэрэглэгддэг.
// validatePassword: Нууц үгийн шаардлагыг шалгах логикыг агуулдаг.
// handlePasswordChange: Нууц үгийг өөрчлөх үед дуудаж, шаардлагыг шалгадаг.
// handleSubmit: Формыг илгээх үед дуудаж, баталгаажуулах логикийг агуулдаг.
// isConfirmPasswordValid: Давтах нууц үг үнэн эсэхийг шалгадаг.
