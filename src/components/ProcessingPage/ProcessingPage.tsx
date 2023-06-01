"use client";

import { FC, Fragment } from "react";
import Dropzone from "../UI/Dropzone";

const ProcessingPage: FC = () => {
  return (
    <div className="flex flex-col gap-10 mt-5 md:mt-auto">
      <h1
        className="font-extrabold text-center text-3xl tracking-tighter leading-tight sm:text-3xl md:text-5xl lg:text-6xl"
      >
        Drop your image(s) below.
      </h1>
      <p className="text-zinc-700 dark:text-zinc-400 w-full text-lg sm:text-xl text-center">
        Effortlessly process multiple images by simply dropping them or clicking
        in the designated area below.
      </p>
      <div className="flex w-full flex-col items-center">
        <Dropzone />
      </div>
    </div>
  );
};

export default ProcessingPage;
