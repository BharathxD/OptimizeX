"use client";

import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import mergeClasses from "@/utils/mergeClasses";

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
          "text-md p-auto flex aspect-square h-[25px] w-[25px] items-center justify-center rounded-full bg-green-600"
        )}
      >
        {name.charAt(0).toUpperCase()}
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
