"use client";

import Image from "next/image";
import { FC } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface ImageInfoProps {
  name: File["name"];
  size: File["size"];
  url: string;
  handleEdit: (fileName: File["name"]) => void;
}

const ImageInfo: FC<ImageInfoProps> = ({ name, size, url, handleEdit }) => {
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-zinc-400">
        <div className="relative flex h-12 w-20">
          <Image
            src={url}
            fill
            alt={name}
            quality={20}
            className="rounded-lg"
          />
        </div>
      </td>
      <td className="px-6 py-4">{name}</td>
      <td className={"hidden md:inline-block text-sm px-10 py-11"}>
        {(size / 1000).toFixed(0)} KB
      </td>
      <td className="px-10 py-10">
        <IoIosRemoveCircleOutline
          size={25}
          onClick={() => handleEdit(name)}
          className="cursor-pointer text-rose-400"
        />
      </td>
    </tr>
  );
};

export default ImageInfo;
