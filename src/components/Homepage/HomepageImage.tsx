import Image from "next/image";

const HomepageImage = () => {
  return (
    <Image
      src="/images/homepage.png"
      alt="Homepage Image"
      width={100}
      unoptimized={true}
      height={100}
      priority={true}
      className="hidden md:block aspect-video w-full md:w-[110vh] md:-ml-7 rounded-lg -mr-10"
    />
  );
};

export default HomepageImage;
