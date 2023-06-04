"use client";

import Image from "next/image";
import { FC, HTMLAttributes } from "react";
import mergeClasses from "@/utils";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string | null;
}

const Avatar: FC<AvatarProps> = ({ src, name, className }) => {
  if (!src && name) {
    return (
      <div
        className={mergeClasses(
          className,
          "flex justify-center items-center text-md p-auto aspect-square w-[25px] h-[25px] bg-green-600 rounded-full"
        )}
      >
        {name.charAt(0)}
      </div>
    );
  }
  return (
    <Image
      className={mergeClasses(className, `${src || `opacity-60`} rounded-full`)}
      height={25}
      width={25}
      quality={100}
      alt="Avatar"
      src={src || "/avatar/placeholder.svg"}
    />
  );
};

export default Avatar;
