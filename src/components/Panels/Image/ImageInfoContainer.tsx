"use client";

import { FC } from "react";
import ImageInfo from "./ImageInfo";

interface ImageInfoContainerProps {
  files: File[] | null;
  handleEdit: (fileName: File["name"]) => void;
}

const ImageInfoContainer: FC<ImageInfoContainerProps> = ({
  files,
  handleEdit,
}) => {
  return (
    <table className="min-w-full divide-y divide-zinc-600">
      <tbody>
        {files?.map((file, index) => {
          return (
            <ImageInfo
              key={index}
              name={file.name}
              size={file.size}
              url={URL.createObjectURL(file)}
              handleEdit={handleEdit}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default ImageInfoContainer;
