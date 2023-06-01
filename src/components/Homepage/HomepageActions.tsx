"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { Button, buttonVariants } from "../Inputs/Button";
import { GoMarkGithub } from "react-icons/go";
import siteConfiguration from "@/config";

const HomepageActions = () => {
  const loginModal = useLoginModal();
  return (
    <div className="flex flex-col w-full gap-3 md:flex-row md:w-auto">
      <Button
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "md:w-fit font-bold text-md w-full",
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
          className: "md:w-fit font-bold text-md w-full",
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
