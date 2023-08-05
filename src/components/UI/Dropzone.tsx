"use client";

import { FC, useCallback, useState } from "react";
import ReactDropzone, { Accept } from "react-dropzone";
import { toast } from "react-hot-toast";

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
          className="outline-12 inset-0 h-[40rem] w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-zinc-800/50 bg-gradient-to-tr from-zinc-800/50 to-zinc-950/50  text-center shadow-2xl outline-dashed outline-zinc-200 transition-colors hover:bg-zinc-800 hover:bg-gradient-to-bl hover:from-zinc-800 hover:to-zinc-950/50 hover:transition md:flex md:w-[40rem]"
        >
          <input {...getInputProps()} required />
          <div className="hidden bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text font-extrabold text-transparent md:-mt-[25%] md:inline-block">
            Click (Or) Drop the Images here
          </div>
          <div className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text pt-[12.5vh] font-extrabold text-transparent md:hidden">
            Click to select Image(s)
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
