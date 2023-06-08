"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const HomepageImage = () => {
  const loadingSkeleton = (
    <div
      role="status"
      className="mt-4 h-[59rem] w-[54rem] bg-zinc-700 hidden animate-pulse md:block aspect-video md:-ml-7 rounded-lg -mr-10"
    ></div>
  );

  return (
    <Fragment>
      <Image
        src="https://media-bucket-project.s3.ap-south-1.amazonaws.com/homepage.webp"
        alt="Homepage Image"
        width={100}
        unoptimized={true}
        height={62.5}
        onLoad={() => loadingSkeleton}
        loading="lazy"
        className="hidden md:block aspect-video w-full md:w-[110vh] rounded-lg"
      />
    </Fragment>
  );
};

export default HomepageImage;
