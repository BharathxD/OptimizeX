"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src?: string | null;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className={`${src || `opacity-60`} rounded-full`}
      height={25}
      width={25}
      quality={100}
      alt="Avatar"
      src={src || "/avatar/placeholder.svg"}
    />
  );
};

export default Avatar;
