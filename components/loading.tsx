import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="/sylvera.png"
        alt="Loading"
        className="w-12 h-12 animate-spin"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Loading;
