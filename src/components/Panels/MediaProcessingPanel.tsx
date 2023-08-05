"use client";

import React, { FC, Fragment, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { siteMessages } from "@/config";
import { uploadImage } from "@/utils/s3Utility";
import { toast } from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

import ProcessBody from "../Container/Processing";
import { Button, buttonVariants } from "../Inputs/Button";
import DownloadButton from "../Inputs/DownloadButton";
import Dropzone from "../UI/Dropzone";
import ImageInfoContainer from "./Image/ImageInfoContainer";

const enum STEP {
  SELECT = 0,
  CURATE = 1,
  PROCESSED = 2,
}

const MediaProcessingPanel: FC = () => {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [processedFiles, setProcessedFiles] = useState<
    { key: string; file: { name: string; type: string } }[] | []
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
          const key = await uploadImage(file, uploadDate);
          return { key: key, file: { name: file.name, type: file.type } };
        });
        const uploadedImages = await Promise.all(uploadPromises);
        router.refresh();
        setProcessedFiles(uploadedImages);
        setStep(STEP.PROCESSED);
      } catch (error: any) {
        toast.error("Something went wrong");
      } finally {
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
          <div className="relative flex w-full flex-col items-center gap-4">
            <Dropzone setFiles={handleDropzoneChange} />
          </div>
        );
      case STEP.CURATE:
        return (
          <Fragment>
            <div className="flex items-center justify-center">
              <Button
                className={buttonVariants({
                  variant: "special",
                  className: `mb-4 w-full md:w-full ${
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
            <div className="relative flex w-full flex-col items-center gap-4">
              <div
                className={`h-auto max-h-[20rem] w-full overflow-auto rounded-lg border border-dashed border-zinc-600 bg-zinc-900 md:w-[40rem] ${
                  isLoading && "bg-zinc-900/50 hover:cursor-not-allowed"
                }`}
              >
                <ImageInfoContainer
                  files={selectedFiles}
                  handleEdit={handleEdit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </Fragment>
        );
      case STEP.PROCESSED:
        return (
          <div className="flex w-full flex-col gap-1">
            <div className="min-w-[25vw] rounded-lg rounded-b-sm bg-zinc-800">
              {processedFiles &&
                processedFiles.map((value, index) => {
                  return (
                    <DownloadButton
                      key={index}
                      objectKey={value.key}
                      fileMetadata={value.file}
                    />
                  );
                })}
            </div>
            <div className="flex items-center justify-center">
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
