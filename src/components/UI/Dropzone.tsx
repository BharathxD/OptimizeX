"use client";

import { FC, Fragment, useCallback, useState } from "react";
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
    "image/webp": [".webp"],
    "image/avif": [".avif"],
  };
  const handleImageDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Filter out files greater than 5MB
      const filteredFiles = acceptedFiles.filter(
        (file) => {
          if (file.size >= 5 * 1024 * 1024) {
            toast.error(`${file.name} is too large to process.`);
          }
          return file.size <= 5 * 1024 * 1024;
        } // 5MB in bytes
      );

      // Check if the total count of uploaded files + the count of accepted files is greater than 10
      if (uploadedFilesCount + filteredFiles.length > 3) {
        // Display an error message or perform any necessary action
        return toast.error("You can only upload up to 3 images at a time.");
      }
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
          className="bg-zinc-800/50 transition-colors hover:bg-zinc-800 h-[40rem] w-full md:w-[40rem] rounded-lg shadow-2xl flex flex-col justify-center items-center  cursor-pointer inset-0 outline-dashed outline-zinc-200 outline-12"
        >
          <input {...getInputProps()} required />
          <div className="-mt-[25vh] md:-mt-[25%] font-bold">
            Click (Or) Drop the Images here
          </div>
        </div>
      )}
    </ReactDropzone>
  );
};

export default Dropzone;
