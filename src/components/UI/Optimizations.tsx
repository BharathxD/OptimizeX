"use client";

import { FC } from "react";
import Typography from "../static/Typegraphy";
import { Button, buttonVariants } from "../Inputs/Button";

interface OptimizationsProps {
  fileName: string;
  createdAt: string;
  extension: string;
  url: string;
}

const Optimizations: FC<OptimizationsProps> = ({
  fileName,
  createdAt,
  extension,
  url,
}) => {
  return (
    <div className={"flex flex-col bg-zinc-800/50 p-4 rounded-lg gap-4"}>
      <div className="flex flex-row justify-between">
        <Typography
          type="subheading"
          className="flex justify-center items-center text-xl"
        >
          {fileName}
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
          })}
          href={url}
          newTab
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default Optimizations;
