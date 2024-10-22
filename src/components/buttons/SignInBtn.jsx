"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const SignIn = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <div className="flex gap-2 items-center">
          <Image
            src={session.user.image}
            alt="profile image"
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="text-amazon_lightText">
            hello, {`${session?.user.name.substring(0, 12)}...`}
          </span>
        </div>
      ) : (
        <button onClick={() => signIn()}>
          Hello,{" "}
          <span className="font-bold hover:text-amazon_yellowDark duration-200">
            sign in
          </span>
        </button>
      )}
    </>
  );
};

export default SignIn;
