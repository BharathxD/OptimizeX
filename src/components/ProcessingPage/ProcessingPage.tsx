"use client";

import React, { FC, useCallback, useState } from "react";
import Dropzone from "../UI/Dropzone";
import InputInfo from "./InputInfo";
import { Button, buttonVariants } from "../Inputs/Button";

const ProcessingPage: FC = () => {
  const [files, setFiles] = useState<File[] | null>(null);

  const onRemove = useCallback((fileName: string) => {
    setFiles((prevFiles) => {
      return prevFiles?.filter((file) => file.name !== fileName) || null;
    });
  }, []);

  const renderDropzone = () => {
    if (!files || files.length === 0) {
      return <Dropzone setFiles={setFiles} />;
    }
    return (
      <div className="bg-zinc-800 border border-dashed border-zinc-600 h-auto max-h-[20rem] w-full md:w-[40rem] rounded-lg overflow-auto">
        <InputInfo files={files} setFiles={setFiles} handleRemove={onRemove} />
      </div>
    );
  };

  const renderHeading = () => {
    if (files && files?.length !== 0) {
      return "Alright One Last step.";
    }
    return "Drop your image(s) below.";
  };

  const renderBody = () => {
    if (files && files?.length !== 0) {
      return "Finalize and curate your pictures with the option to selectively choose or remove them.";
    }
    return "Effortlessly process multiple images by simply dropping them or clicking in the designated area below.";
  };

  return (
    <div className={`flex flex-col gap-10 absolute top-3 p-5 w-full`}>
      <h1 className="font-extrabold text-center text-3xl tracking-tighter leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
        {renderHeading()}
      </h1>
      <p className="text-zinc-700 dark:text-zinc-400 w-full text-lg sm:text-xl text-center">
        {renderBody()}
      </p>
      <div className="flex w-full md:justify-center md:items-center">
        <div className="w-full md:w-max">
          {files && files?.length !== 0 && (
            <div className="flex justify-center items-center">
              <Button
                className={buttonVariants({
                  variant: "special",
                  className: "w-full md:w-full mb-4",
                })}
              >
                Begin Processing
              </Button>
            </div>
          )}
          <div className="flex w-full flex-col gap-4 items-center relative">
            {renderDropzone()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPage;
