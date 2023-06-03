"use client";

import Image from "next/image";

const HomepageImage = () => {
  const loadingSkeleton = (
    <div
      role="status"
      className="mt-4 h-[59rem] w-[54rem] bg-zinc-700 hidden animate-pulse md:block aspect-video md:-ml-7 rounded-lg -mr-10"
    ></div>
  );

  return (
    <div>
      <Image
        src="/images/homepage.png"
        alt="Homepage Image"
        width={100}
        unoptimized={true}
        height={100}
        priority={true}
        onLoad={() => loadingSkeleton}
        className="hidden md:block aspect-video w-full md:w-[110vh] rounded-lg"
      />
    </div>
  );
};

export default HomepageImage;
