"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleSignInButton() {
  return (
    <>
      <button
        type="button"
        onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
        className="w-full mt-4 flex items-center justify-center gap-2 bg-[#2c2c2c] hover:bg-[#444] text-white font-semibold py-2 rounded-md transition"
      >
        <FcGoogle />
        Continue with google
      </button>
    </>
  );
}
