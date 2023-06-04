"use client";

import { FC, Fragment, useState } from "react";
import Typography from "../static/Typegraphy";
import { SafeUserOptimizations } from "@/types/Optimizations";
import Optimizations from "./Optimizations";
import Link from "next/link";
import { Button, buttonVariants } from "../Inputs/Button";

interface UserOptimizationsProps {
  optimizations: SafeUserOptimizations[] | null;
}

const UserOptimizations: FC<UserOptimizationsProps> = ({ optimizations }) => {
  const hasOptimizations = optimizations && optimizations?.length !== 0;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const maxItemsPerPage = 4;
  const maxPages = Math.ceil((optimizations?.length || 0) / maxItemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const optimizationPage = optimizations?.slice(
    (currentPage - 1) * maxItemsPerPage,
    currentPage * maxItemsPerPage
  );

  return (
    <Fragment>
      <div className="bg-zinc-800/50 p-4 flex rounded-lg">
        <Typography type="heading">Optimization History</Typography>
      </div>
      <div className="flex w-full flex-row gap-2 justify-center items-center">
        {maxPages !== 1 &&
          Array.from({ length: maxPages }).map((_, i) => (
            <div
              key={i}
              className={`p-2 flex items-center justify-center w-full rounded-lg cursor-pointer ${
                currentPage === i + 1
                  ? "bg-zinc-200 text-zinc-800"
                  : "bg-zinc-800 text-zinc-200"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </div>
          ))}
      </div>
      <div className="flex flex-col bg-zinc-800/50 p-3 rounded-lg gap-4 h-full">
        {(!optimizations || optimizations.length === 0) && (
          <div className="flex flex-col gap-4 justify-center items-center h-full w-full text-2xl font-bold">
            <div className="flex flex-col gap-4 justify-center items-center ">
              <div>You haven&apos;t optimized anything :&#40;</div>
              <div className="w-full">
                <Button
                  className={buttonVariants({
                    variant: "special",
                    className: "w-full",
                  })}
                  href="/"
                >
                  Get&apos;Em Optimized!
                </Button>
              </div>
            </div>
          </div>
        )}
        {hasOptimizations &&
          optimizationPage?.map((optimization) => {
            return (
              <Optimizations
                key={optimization.id}
                fileName={optimization.fileName}
                createdAt={optimization.createdAt}
                extension={optimization.extension}
                url={optimization.url}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default UserOptimizations;
