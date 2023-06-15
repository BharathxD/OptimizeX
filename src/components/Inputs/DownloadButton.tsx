"use client";

import React, { FC, Fragment } from "react";
import { useQuery } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { Button, buttonVariants } from "./Button";
import { StatusCodes } from "http-status-codes";
import { arrayBufferToBlob } from "blob-util";
import { toast } from "react-hot-toast";

interface DownloadButtonProps {
  objectKey: string;
  fileMetadata: {
    name: string;
    type: string;
  };
}

const DownloadButton: FC<DownloadButtonProps> = ({
  objectKey,
  fileMetadata,
}) => {
  const {
    data: optimizedImageBuffer,
    isLoading,
    error: isError,
  } = useQuery({
    queryFn: async () => {
      const response: AxiosResponse<ArrayBuffer> = await axios.get(
        `/api/optimize?key=${objectKey}`,
        { responseType: "arraybuffer" }
      );
      if (response.status !== StatusCodes.OK) return null;
      return response.data;
    },
    retry: (failureCount, error: AxiosError) => {
      if (failureCount > 5 || error.response?.status === 200) {
        return false;
      }
      return true;
    },
    retryDelay: 5000,
  });

  const handleDownload = async () => {
    if (optimizedImageBuffer) {
      const blob = arrayBufferToBlob(optimizedImageBuffer, fileMetadata.type);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Optimized-" + fileMetadata.name;
      a.click();
      toast.success(`Saved ${fileMetadata.name} to your device.`);
      URL.revokeObjectURL(url);
    }
  };

  const renderMessage = () => {
    if (isLoading) {
      return (
        <Fragment>
          <p>Processing {fileMetadata.name}</p>
          <AiOutlineLoading className="animate-spin" />
        </Fragment>
      );
    } else if (isError) {
      return (
        <p>
          Sorry, it&apos;s taking too long to process. You can check your
          profile later to download it.
        </p>
      );
    } else if (fileMetadata) {
      return <p>Download {fileMetadata.name}</p>;
    }
    return null;
  };

  const renderButton = () => {
    const buttonClassName = buttonVariants({
      variant: "special",
      className: `p-6 disabled:bg-zinc-500 flex justify-between items-center ${
        (isLoading || isError) && "disabled"
      }`,
    });

    return (
      <Button
        className={buttonClassName}
        onClick={handleDownload}
        disabled={isLoading || !!isError}
      >
        {renderMessage()}
      </Button>
    );
  };

  return <div className="p-2 flex flex-col gap-2 w-full">{renderButton()}</div>;
};

export default DownloadButton;
