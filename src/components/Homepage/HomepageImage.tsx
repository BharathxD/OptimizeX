"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const HomepageImage = () => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Fragment>
      <Image
        src="https://media-bucket-project.s3.ap-south-1.amazonaws.com/homepage.webp"
        alt="Homepage Image"
        width={100}
        priority={true}
        unoptimized={true}
        height={100}
        onLoad={() => setLoaded(true)}
        className={`hidden md:block aspect-video w-[110vh] rounded-lg ${
          loaded ? "opacity-100" : "opacity-0"
        } transition`}
      />
    </Fragment>
  );
};

export default HomepageImage;
