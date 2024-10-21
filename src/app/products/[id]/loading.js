const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-[100px]">
      <div
        className={`border-4 border-t-4 border-gray-200 border-t-amazon_orangeDark h-24 w-24 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
