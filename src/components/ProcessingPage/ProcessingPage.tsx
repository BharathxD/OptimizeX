"use client";

import React, { FC, Fragment, useCallback, useState } from "react";
import Dropzone from "../UI/Dropzone";
import ImageInfoContainer from "./Image/ImageInfoContainer";
import { Button, buttonVariants } from "../Inputs/Button";
import ProcessBody from "../Wrapper/Processing";
import { siteMessages } from "@/config";
import { uploadImage } from "@/utils/api";

enum STEP {
  SELECT,
  CURATE,
  PROCESSED,
}

const ProcessingPage: FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [processedFiles, setProcessedFiles] = useState<string[] | []>([]);
  const [step, setStep] = useState<STEP>(STEP.SELECT);

  const handleEdit = useCallback((fileName: string) => {
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles =
        prevSelectedFiles?.filter((file) => file.name !== fileName) || null;
      if (!updatedFiles || updatedFiles.length === 0) {
        setStep(STEP.SELECT);
      }
      return updatedFiles;
    });
  }, []);

  const handleDropzoneChange = useCallback((files: File[]) => {
    setSelectedFiles(files);
    setStep(STEP.CURATE);
  }, []);

  const handleBeginProcessing = async () => {
    if (selectedFiles && selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map(async (file) => {
          const key = await uploadImage(file);
          return key;
        });
        const uploadedImages = await Promise.all(uploadPromises);
        setProcessedFiles(uploadedImages);
        setStep(STEP.PROCESSED);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderHeading = () => {
    switch (step) {
      case STEP.SELECT:
        return siteMessages.heading.withoutFiles;
      case STEP.CURATE:
        return siteMessages.heading.withFiles;
      case STEP.PROCESSED:
        return siteMessages.heading.afterProcessed;
      default:
        return null;
    }
  };

  const renderBody = () => {
    switch (step) {
      case STEP.SELECT:
        return siteMessages.body.withoutFiles;
      case STEP.CURATE:
        return siteMessages.body.withFiles;
      case STEP.PROCESSED:
        return siteMessages.body.afterProcessed;
      default:
        return null;
    }
  };

  const renderFooter = () => {
    switch (step) {
      case STEP.SELECT:
        return (
          <div className="flex w-full flex-col gap-4 items-center relative">
            <Dropzone setFiles={handleDropzoneChange} />
          </div>
        );
      case STEP.CURATE:
        return (
          <Fragment>
            <div className="flex justify-center items-center">
              <Button
                className={buttonVariants({
                  variant: "special",
                  className: "w-full md:w-full mb-4",
                })}
                onClick={handleBeginProcessing}
              >
                Begin Processing
              </Button>
            </div>
            <div className="flex w-full flex-col gap-4 items-center relative">
              <div className="bg-zinc-800 border border-dashed border-zinc-600 h-auto max-h-[20rem] w-full md:w-[40rem] rounded-lg overflow-auto">
                <ImageInfoContainer
                  files={selectedFiles}
                  handleEdit={handleEdit}
                />
              </div>
            </div>
          </Fragment>
        );
      case STEP.PROCESSED:
        return (
          <Fragment>
            <div>
              {processedFiles &&
                processedFiles.map((file, index) => <p key={index}>{file}</p>)}
            </div>
            <div className="flex justify-center items-center">
              <Button
                className={buttonVariants({
                  variant: "default",
                })}
                onClick={() => {
                  setStep(STEP.SELECT);
                  setProcessedFiles([]);
                }}
              >
                Reset
              </Button>
            </div>
          </Fragment>
        );
      default:
        return null;
    }
  };

  return (
    <ProcessBody
      header={renderHeading()}
      body={renderBody()}
      footer={renderFooter()}
    />
  );
};

export default ProcessingPage;
