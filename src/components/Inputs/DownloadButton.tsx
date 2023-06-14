"use client";

import React, { FC } from "react";
import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { Button, buttonVariants } from "./Button";
import { StatusCodes } from "http-status-codes";
import { arrayBufferToBlob } from "blob-util";

interface DownloadButtonProps {
  objectKey: string;
  file: {
    name: string;
    type: string;
  };
}

const DownloadButton: FC<DownloadButtonProps> = ({ objectKey, file }) => {
  const {
    data: optimizedImageBuffer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      try {
        const response: AxiosResponse<ArrayBuffer> = await axios.post(
          "/api/optimize",
          { key: objectKey, file },
          { responseType: "arraybuffer" }
        );
        if (response.status !== StatusCodes.OK) return null;
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });

  const handleDownload = async () => {
    if (optimizedImageBuffer) {
      const blob = arrayBufferToBlob(optimizedImageBuffer);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const renderMessage = () => {
    if (isLoading) {
      return (
        <>
          <p>Processing {file.name}</p>
          <AiOutlineLoading className="animate-spin" />
        </>
      );
    } else if (isError) {
      return (
        <p>
          Sorry, it&apos;s taking too long to process. You can check your
          profile later to download it.
        </p>
      );
    } else if (file) {
      return (
        <>
          <p>Download {file.name}</p>
        </>
      );
    }
    return null;
  };

  const renderButton = () => {
    const buttonClassName = buttonVariants({
      variant: "special",
      className: `p-6 disabled:bg-zinc-500 flex justify-between items-center ${
        isLoading || !!error ? "disabled" : ""
      }`,
    });

    return (
      <Button
        className={buttonClassName}
        onClick={handleDownload}
        disabled={isLoading || !!error}
      >
        {renderMessage()}
      </Button>
    );
  };

  return <div className="p-2 flex flex-col gap-2 w-full">{renderButton()}</div>;
};

export default DownloadButton;
