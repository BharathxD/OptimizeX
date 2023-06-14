import Image from "next/image";
import { Fragment } from "react";

const HomepageImage = () => {
  return (
    <Fragment>
      <Image
        src="/images/homepage.webp"
        alt="Homepage Image"
        width={100}
        priority={true}
        unoptimized={true}
        height={100}
        className={`hidden md:block aspect-video w-[110vh] rounded-lg`}
      />
    </Fragment>
  );
};

export default HomepageImage;
