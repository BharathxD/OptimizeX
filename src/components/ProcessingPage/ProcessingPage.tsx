"use client";

import React, { FC, Fragment, useCallback, useState } from "react";
import Dropzone from "../UI/Dropzone";
import ImageInfoContainer from "./Image/ImageInfoContainer";
import { Button, buttonVariants } from "../Inputs/Button";
import ProcessBody from "../Wrapper/Processing";
import { siteMessages } from "@/config";

enum STEP {
  SELECT,
  CURATE,
  PROCESSED,
}

const ProcessingPage: FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
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
    setSelectedFiles((prevSelectedFiles) => {
      const updatedFiles = [...(prevSelectedFiles || []), ...files];
      if (updatedFiles.length > 0) {
        setStep(STEP.CURATE);
      }
      return updatedFiles;
    });
  }, []);

  const handleBeginProcessing = async () => {
    // Perform async operation here

    // Once the operation is complete, set the step to PROCESSED
    setStep(STEP.PROCESSED);
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
            <div className="flex justify-center items-center">
              <Button
                className={buttonVariants({
                  variant: "default",
                })}
                onClick={() => setStep(STEP.SELECT)}
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
