"use client";

import { FC } from "react";
import ImageInfo from "./ImageInfo";

interface InputInfoProps {
  files: File[];
  setFiles: (files: File[]) => void;
  handleRemove: (fileName: File["name"]) => void;
}

const InputInfo: FC<InputInfoProps> = ({ files, setFiles, handleRemove }) => {
  return (
    <table className="min-w-full divide-y dark:divide-zinc-600">
      <tbody>
        {files.map((file, index) => {
          return (
            <ImageInfo
              key={index}
              name={file.name}
              size={file.size}
              url={URL.createObjectURL(file)}
              setFiles={setFiles}
              handleRemove={handleRemove}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default InputInfo;
