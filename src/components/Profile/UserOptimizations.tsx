"use client";

import { Fragment, useState } from "react";
import Typography from "../UI/Typography";
import { SafeUserOptimizations } from "@/types/Optimizations";
import Optimizations from "./Optimizations";
import { Button, buttonVariants } from "../Inputs/Button";

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
      <div className="bg-zinc-800/50 p-4 flex rounded-lg rounded-tl-sm rounded-b-sm">
        <Typography type="heading">Optimization History</Typography>
      </div>
      <div className="flex w-full flex-row gap-2 justify-center items-center">
        {maxPages !== 1 &&
          Array.from({ length: maxPages }).map((_, i) => (
            <div
              key={i}
              className={`p-2 flex items-center justify-center w-full rounded-sm cursor-pointer  ${
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
        className={`flex flex-col bg-zinc-800/50 p-3 rounded-lg gap-4 h-full rounded-t-sm rounded-l-sm ${
          optimizations && optimizations?.length <= 4 && "-mt-2"
        }`}
      >
        {(!optimizations || optimizations.length === 0) && (
          <div className="flex flex-col gap-4 justify-center items-center h-full w-full text-2xl font-bold">
            <div className="flex flex-col gap-4 justify-center items-center">
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
              url={optimization.url}
              hasExpired={optimization.expired}
              length={optimizationPage.length}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default UserOptimizations;
