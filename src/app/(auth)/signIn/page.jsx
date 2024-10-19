"use client";

import { github, google } from "@/src/assets";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignIn = () => {
  const handleLogin = (provider) => {
    signIn(provider, { callbackUrl: "/" });
  };
  return (
    <div className="flex p-3 items-center justify-center w-full h-screen -mt-[110px] bg-black">
      <div className="bg-white p-5 rounded-md flex flex-col gap-5 w-full md:w-[500px] lg:w-[600px] mx-auto">
        <button
          onClick={() => handleLogin("github")}
          className="flex items-center justify-center text-white gap-5 p-3 w-full font-bold border-none rounded-md cursor-pointer bg-black"
        >
          <div className="relative w-[20px] h-[20px]">
            <Image
              src={github}
              alt="GitHub logo"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          Login With Github
        </button>
        <button
          onClick={() => handleLogin("google")}
          className="flex items-center justify-center text-white gap-5 p-3 w-full font-bold border-none rounded-md cursor-pointer bg-black"
        >
          <div className="relative w-[20px] h-[20px]">
            <Image
              src={google}
              alt="Google logo"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          Login With Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
