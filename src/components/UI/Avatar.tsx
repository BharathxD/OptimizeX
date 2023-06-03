"use client";

import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src?: string | null;
  name: string | null;
}

const Avatar: FC<AvatarProps> = ({ src, name }) => {
  if (!src && name) {
    return (
      <div className="flex justify-center items-center font-bold text-xl h-[25px] w-[25px]">
        {name.charAt(0)}
      </div>
    );
  }
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
