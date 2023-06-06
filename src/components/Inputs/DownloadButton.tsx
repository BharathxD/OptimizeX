"use client";

import React, { FC, Fragment } from "react";
import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { Button, buttonVariants } from "./Button";

interface DownloadButtonProps {
  name: string;
  url: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ name, url }) => {
  const { data, isLoading } = useQuery(
    url,
    async () => {
      const response = await axios.get(url);
      return response.status;
    },
    {
      retry: (failureCount, error: AxiosError) => {
        if (
          failureCount > 30 ||
          error.response?.status === 200 ||
          data === 200
        ) {
          return false;
        } else {
          return true;
        }
      },
      retryDelay: 5000,
      refetchOnWindowFocus: false,
    }
  );

  const renderMessage = () => {
    if (isLoading) {
      return (
        <Fragment>
          <p>Processing {name}</p>
          <AiOutlineLoading className="animate-spin" />
        </Fragment>
      );
    } else if (data === 200) {
      return <p>Download {name}</p>;
    } else {
      return <p>Sorry something went wrong :(</p>;
    }
  };

  const renderButton = () => {
    const isDownloaded = data === 200;
    const buttonClassName = buttonVariants({
      variant: "special",
      className: `p-6 disabled:bg-zinc-500 flex justify-between items-center ${
        isDownloaded ? "" : "disabled"
      }`,
    });

    return (
      <Button
        className={buttonClassName}
        href={isDownloaded ? url : undefined}
        disabled={!isDownloaded}
        newTab
      >
        {renderMessage()}
      </Button>
    );
  };

  return <div className="p-2 flex flex-col gap-2 w-full">{renderButton()}</div>;
};

export default DownloadButton;
