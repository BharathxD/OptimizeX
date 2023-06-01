"use client";

import { Fragment, useCallback } from "react";
import ReactDropzone, { Accept } from "react-dropzone";

const Dropzone = () => {
  const acceptedFileTypes: Accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/tiff": [".tiff"],
    "image/webp": [".webp"],
    "image/avif": [".avif"],
  };
  const handleImageDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  return (
    <ReactDropzone
      accept={acceptedFileTypes}
      onDrop={handleImageDrop}
      multiple={false}
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
