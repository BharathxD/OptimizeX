// Optimizations.jsx

"use client";

import Typography from "../UI/Typography";
import { Button, buttonVariants } from "../Inputs/Button";

interface OptimizationsProps {
  fileName: string;
  createdAt: string;
  extension: string;
  url: string;
  length?: number;
  hasExpired: boolean;
}

const Optimizations = ({
  fileName,
  createdAt,
  extension,
  url,
  length,
  hasExpired,
}: OptimizationsProps) => {
  const isFullHeight = length && length >= 4;
  const name =
    fileName.length > 8 ? `${fileName.substring(0, 8)}...` : fileName;
  return (
    <div
      className={`flex flex-col justify-center bg-zinc-800/50 p-4 ${
        isFullHeight ? "h-full" : "h-min"
      } rounded-lg gap-4`}
    >
      <div className="flex flex-row justify-between">
        <Typography
          type="subheading"
          className="flex justify-center items-center text-md md:text-md truncate"
        >
          <div className="md:hidden">{name}</div>
          <div className="hidden md:inline-block">{fileName}</div>
        </Typography>
        <div className="flex justify-center items-center text-md">
          {createdAt}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex justify-center items-center text-md">
          It&apos;s a {extension}
        </div>

        <Button
          className={buttonVariants({
            variant: "default",
            className: `${
              hasExpired && "disabled:bg-red-600 disabled:text-zinc-50"
            }`,
          })}
          href={!hasExpired ? url : undefined}
          disabled={hasExpired}
          newTab
        >
          {!hasExpired ? "Download" : "Expired"}
        </Button>
      </div>
    </div>
  );
};

export default Optimizations;
