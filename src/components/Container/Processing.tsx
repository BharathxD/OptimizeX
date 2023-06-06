"use client";

import { FC, ReactNode } from "react";

interface WrapperProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

const ProcessBody: FC<WrapperProps> = ({ header, body, footer }) => {
  return (
    <div className={`flex flex-col gap-10 absolute top-3 p-5 w-full`}>
      <h1 className="font-extrabold text-center text-3xl tracking-tighter leading-tight sm:text-3xl md:text-5xl lg:text-6xl bg-gradient-to-br from-zinc-200 to-zinc-400 text-transparent bg-clip-text p-1">
        {header}
      </h1>
      <p className="text-zinc-400 w-full text-lg sm:text-xl text-center">
        {body}
      </p>
      <div className="flex w-full md:justify-center md:items-center">
        <div className="w-full md:w-max">{footer}</div>
      </div>
    </div>
  );
};

export default ProcessBody;
