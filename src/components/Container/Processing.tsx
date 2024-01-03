"use client";

import { FC, memo, ReactNode } from "react";

interface WrapperProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

const ProcessBody: FC<WrapperProps> = ({ header, body, footer }) => {
  return (
    <div className={`absolute top-3 flex w-full flex-col gap-10 p-5`}>
      <h1 className="bg-gradient-to-br from-zinc-200 to-zinc-400 bg-clip-text p-1 text-center text-3xl font-extrabold leading-tight tracking-tighter text-transparent sm:text-3xl md:text-5xl lg:text-6xl">
        {header}
      </h1>
      <p className="w-full text-center text-lg text-zinc-400 sm:text-xl">
        {body}
      </p>
      <div className="flex w-full md:items-center md:justify-center">
        <div className="w-full md:w-max">{footer}</div>
      </div>
    </div>
  );
};

ProcessBody.displayName = "ProcessBody";

export default memo(ProcessBody);
