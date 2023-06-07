"use client";

import React, { FC, Fragment, useCallback, useState } from "react";
import Dropzone from "../UI/Dropzone";
import ImageInfoContainer from "./Image/ImageInfoContainer";
import { Button, buttonVariants } from "../Inputs/Button";
import ProcessBody from "../Container/Processing";
import { siteMessages } from "@/config";
import { uploadImage } from "@/utils/s3Utility";
import { AiOutlineLoading } from "react-icons/ai";
import DownloadButton from "../Inputs/DownloadButton";
import { useRouter } from "next/navigation";

const enum STEP {
  SELECT = 0,
  CURATE = 1,
  PROCESSED = 2,
}

const MediaProcessingPanel: FC = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [processedFiles, setProcessedFiles] = useState<
    { name: string; url: string }[] | []
  >([]);
  const [step, setStep] = useState<STEP>(STEP.SELECT);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    if (selectedFiles && selectedFiles.length > 0) {
      try {
        const uploadPromises = selectedFiles.map(async (file) => {
          const uploadDate = new Date();
          const url = await uploadImage(file, uploadDate);
          return { name: file.name, url: url };
        });
        const uploadedImages = await Promise.all(uploadPromises);
        router.refresh();
        setProcessedFiles(uploadedImages);
        setStep(STEP.PROCESSED);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
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
        return siteMessages.heading.afterUploading;
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
        return siteMessages.body.afterUploading;
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
                  className: `w-full md:w-full mb-4 ${
                    isLoading && "animate-pulse disabled:opacity-50"
                  }`,
                })}
                disabled={isLoading}
                onClick={handleBeginProcessing}
              >
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  "Begin Uploading"
                )}
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
          <div className="flex flex-col gap-1 w-full">
            <div className="min-w-[25vw] bg-zinc-800 rounded-lg rounded-b-sm">
              {processedFiles &&
                processedFiles.map((value, index) => {
                  return (
                    <DownloadButton
                      key={index}
                      name={value.name}
                      url={value.url}
                    />
                  );
                })}
            </div>
            <div className="flex justify-center items-center">
              <Button
                className={buttonVariants({
                  variant: "default",
                  className: "w-full rounded-t-sm",
                })}
                onClick={() => {
                  setStep(STEP.SELECT);
                  setProcessedFiles([]);
                }}
              >
                Initiate new batch
              </Button>
            </div>
          </div>
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

export default MediaProcessingPanel;
