"use client";

import { siteConfiguration } from "@/config";
import { GoMarkGithub } from "react-icons/go";

import useLoginModal from "@/hooks/useLoginModal";

import { Button, buttonVariants } from "../Inputs/Button";

const HomepageActions = () => {
  const loginModal = useLoginModal();
  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
      <Button
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "text-md w-full font-bold md:w-fit",
        })}
        onClick={() => {
          loginModal.onOpen();
        }}
      >
        Get Optimized
      </Button>
      <Button
        className={buttonVariants({
          variant: "special",
          size: "lg",
          className: "text-md w-full font-bold md:w-fit",
        })}
        href={siteConfiguration.project.github}
        icon={GoMarkGithub}
        newTab
      >
        Shine a Star
      </Button>
    </div>
  );
};

export default HomepageActions;
