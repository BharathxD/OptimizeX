"use client";

import { Fragment, useState } from "react";

import { SafeUserOptimizations } from "@/types/Optimizations";

import { Button, buttonVariants } from "../Inputs/Button";
import Typography from "../UI/Typography";
import Optimizations from "./Optimizations";

interface UserOptimizationsProps {
  optimizations: SafeUserOptimizations[] | null;
}

const UserOptimizations = ({ optimizations }: UserOptimizationsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxItemsPerPage = 4;
  const maxPages = Math.ceil((optimizations?.length || 0) / maxItemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const optimizationPage = optimizations?.slice(
    (currentPage - 1) * maxItemsPerPage,
    currentPage * maxItemsPerPage
  );

  const hasOptimizations = optimizations && optimizations?.length !== 0;

  return (
    <Fragment>
      <div className="flex rounded-lg rounded-b-sm rounded-tl-sm bg-zinc-800/50 p-4">
        <Typography type="heading">Optimization History</Typography>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-2">
        {maxPages !== 1 &&
          Array.from({ length: maxPages }).map((_, i) => (
            <div
              key={i}
              className={`flex w-full cursor-pointer items-center justify-center rounded-sm p-2  ${
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
      <div
        className={`flex h-full flex-col gap-4 rounded-lg rounded-l-sm rounded-t-sm bg-zinc-800/50 p-3 ${
          optimizations && optimizations?.length <= 4 && "-mt-2"
        }`}
      >
        {(!optimizations || optimizations.length === 0) && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-2xl font-bold">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="text-light">
                Oops! We couldn&apos;t find any previous optimization records
              </div>
              <div className="w-full">
                <Button
                  className={buttonVariants({
                    variant: "special",
                    className: "w-full",
                  })}
                  href="/"
                >
                  Optimize Now
                </Button>
              </div>
            </div>
          </div>
        )}
        {hasOptimizations &&
          optimizationPage?.map((optimization) => (
            <Optimizations
              key={optimization.id}
              fileName={optimization.fileName}
              createdAt={optimization.createdAt}
              extension={optimization.extension}
              objectKey={optimization.objectKey}
              hasExpired={optimization.expired}
              length={optimizationPage.length}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default UserOptimizations;
