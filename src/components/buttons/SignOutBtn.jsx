import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <button
      className="hover:bg-red-700 text-white font-bold px-2 text-nowrap rounded focus:outline-none focus:shadow-outline"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutBtn;
