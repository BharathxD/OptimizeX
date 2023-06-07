"use client";

import { FC, Fragment, useCallback, useState } from "react";
import ReactDropzone, { Accept } from "react-dropzone";
import { toast } from "react-hot-toast";
import Toast from "./Toast";

interface DropzoneProps {
  setFiles: (files: File[]) => void;
}

const Dropzone: FC<DropzoneProps> = ({ setFiles }) => {
  const [uploadedFilesCount, setUploadedFilesCount] = useState(0);

  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/tiff": [".tiff"],
    "image/avif": [".avif"],
  };
  const handleImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (uploadedFilesCount + acceptedFiles.length > 3) {
        return toast.error("You can only upload up to 3 images at a time.");
      }

      const filteredFiles = acceptedFiles.filter((file) => {
        if (file.size >= 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large to process.`);
        }
        return file.size <= 5 * 1024 * 1024;
      });

      if (filteredFiles.length <= 0) {
        return;
      }

      setUploadedFilesCount(uploadedFilesCount + filteredFiles.length);

      setFiles(filteredFiles);
    },
    [setFiles, uploadedFilesCount]
  );

  return (
    <ReactDropzone
      accept={acceptedFileTypes}
      onDrop={handleImageDrop}
      multiple={true}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="bg-zinc-800/50 transition-colors hover:bg-zinc-800 h-[40rem] w-full md:w-[40rem] rounded-lg shadow-2xl text-center md:flex flex-col justify-center items-center  cursor-pointer inset-0 outline-dashed bg-gradient-to-tr from-zinc-800/50 to-zinc-950/50 outline-zinc-200 outline-12 hover:transition hover:bg-gradient-to-bl hover:from-zinc-800 hover:to-zinc-950/50"
        >
          <input {...getInputProps()} required />
          <div className="hidden md:inline-block md:-mt-[25%] text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 to-zinc-400 font-extrabold">
            Click (Or) Drop the Images here
          </div>
          <div className="md:hidden pt-[12.5vh] text-transparent bg-clip-text bg-gradient-to-br from-zinc-200 to-zinc-400 font-extrabold">
            Click to select Image(s)
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
