"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src?: string;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className={`${src || `opacity-60`} rounded-full`}
      height={30}
      width={30}
      alt="Avatar"
      src={src || "/avatar/placeholder.svg"}
    />
  );
};

export default Avatar;
