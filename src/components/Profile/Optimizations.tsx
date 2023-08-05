"use client";

import axios, { AxiosResponse } from "axios";
import { arrayBufferToBlob } from "blob-util";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

import { Button, buttonVariants } from "../Inputs/Button";
import Typography from "../UI/Typography";

interface OptimizationsProps {
  fileName: string;
  createdAt: string;
  extension: string;
  objectKey: string;
  length?: number;
  hasExpired: boolean;
}

const Optimizations = ({
  fileName,
  createdAt,
  extension,
  objectKey,
  length,
  hasExpired,
}: OptimizationsProps) => {
  const isFullHeight = length && length >= 4;
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response: AxiosResponse<Buffer> = await axios.get(
        `/api/optimize?key=${objectKey.replace("optimize/", "")}`,
        { responseType: "arraybuffer" }
      );
      if (response.status === StatusCodes.OK) return response.data;
      return null;
    },
    onSuccess: async (data) => {
      if (!data) return null;
      const blob = arrayBufferToBlob(data);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Optimized-" + fileName;
      a.click();
      toast.success(`Saved ${fileName} to your device.`);
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast.success("Something went wrong");
    },
  });
  const name =
    fileName.length > 8 ? `${fileName.substring(0, 10)}...` : fileName;
  return (
    <div
      className={`flex flex-col justify-center bg-zinc-800/50 p-4 ${
        isFullHeight ? "h-full" : "h-min"
      } gap-4 rounded-lg`}
    >
      <div className="flex flex-row justify-between">
        <Typography
          type="subheading"
          className="text-md md:text-md flex items-center justify-center truncate"
        >
          <div className="md:hidden">{name}</div>
          <div className="hidden md:inline-block">{fileName.split(".")[0]}</div>
        </Typography>
        <div className="text-md flex items-center justify-center">
          {createdAt}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-md flex items-center justify-center">
          It&apos;s a {extension}
        </div>

        <Button
          className={buttonVariants({
            variant: "default",
            className: `min-w-[100px] bg-gradient-to-br from-zinc-200  to-zinc-400 text-zinc-700 ${
              hasExpired &&
              "bg-gradient-to-br from-red-500 to-red-800 hover:cursor-not-allowed disabled:bg-red-600 disabled:text-zinc-50"
            }`,
          })}
          iconColor="black"
          onClick={() => mutate()}
          disabled={hasExpired || isLoading}
          isLoading={isLoading}
        >
          {!hasExpired ? "Download" : "Expired"}
        </Button>
      </div>
    </div>
  );
};

export default Optimizations;
