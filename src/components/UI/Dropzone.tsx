"use client";

import { FC, Fragment, useCallback, useState } from "react";
import ReactDropzone, { Accept } from "react-dropzone";

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
      // Check if the total count of uploaded files + the count of accepted files is greater than 10
      if (uploadedFilesCount + acceptedFiles.length > 10) {
        // Display an error message or perform any necessary action
        console.log("You can only upload up to 10 images.");
        return;
      }

      setUploadedFilesCount(uploadedFilesCount + acceptedFiles.length);
      setFiles(acceptedFiles);
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
