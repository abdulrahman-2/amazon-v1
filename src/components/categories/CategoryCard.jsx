import Image from "next/image";

const CategoryCard = ({ title, image, linkName }) => {
  return (
    <div className="p-5 shadow-md border h-[398px] border-slate-200 bg-white rounded-md flex flex-col justify-between gap-3">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="relative h-[280px] w-full">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="absolute h-full w-full object-cover"
        />
      </div>
      <span className="text-[#057487] hover:underline hover:text-red-500">
        {linkName}
      </span>
    </div>
  );
};

export default CategoryCard;
