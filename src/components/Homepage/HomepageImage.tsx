"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

const HomepageImage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const handleImageLoad = () => setIsLoaded(true);
  return (
    <Fragment>
      <Image
        src="https://media-bucket-project.s3.ap-south-1.amazonaws.com/homepage.webp"
        alt="Homepage Image"
        width={100}
        priority={true}
        unoptimized={true}
        onLoad={handleImageLoad}
        height={100}
        className={`hidden aspect-video w-[110vh] rounded-lg md:block ${
          !isLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity`}
      />
    </Fragment>
  );
};

export default HomepageImage;
