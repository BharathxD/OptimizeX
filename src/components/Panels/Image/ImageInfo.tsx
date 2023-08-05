"use client";

import { FC } from "react";
import Image from "next/image";
import { IoIosRemoveCircleOutline } from "react-icons/io";

interface ImageInfoProps {
  name: File["name"];
  size: File["size"];
  url: string;
  handleEdit: (fileName: File["name"]) => void;
  isLoading: boolean;
}

const ImageInfo: FC<ImageInfoProps> = ({
  name,
  size,
  url,
  handleEdit,
  isLoading,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-zinc-400">
        <div className="relative flex h-12 w-20">
          <Image
            src={url}
            fill
            alt={name}
            quality={20}
            className="rounded-lg border border-zinc-600 object-cover"
          />
        </div>
      </td>
      <td className="px-6 py-4">{name}</td>
      <td className={"hidden px-10 py-11 text-sm md:inline-block"}>
        {(size / 1000).toFixed(0)} KB
      </td>
      <td className="px-10 py-10">
        <button disabled={isLoading} onClick={() => handleEdit(name)}>
          <IoIosRemoveCircleOutline
            size={25}
            className={`cursor-pointer text-rose-400 ${
              isLoading && "text-rose-800 hover:cursor-not-allowed"
            }`}
          />
        </button>
      </td>
    </tr>
  );
};

export default ImageInfo;
