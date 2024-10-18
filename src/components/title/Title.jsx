import Link from "next/link";

const Title = ({ title, link }) => {
  return (
    <div className="mb-5 flex flex-col md:flex-row items-center gap-2 md:gap-5">
      <h3 className="text-base md:text-xl font-semibold">{title}</h3>
      <Link
        href="/budget"
        className="text-[#057487] hover:underline text-sm hover:text-red-500"
      >
        {link}
      </Link>
    </div>
  );
};

export default Title;
