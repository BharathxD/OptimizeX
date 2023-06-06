"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Button, buttonVariants } from "../Inputs/Button";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  title?: string;
  body?: ReactElement | null;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      // If the modal is already disabled
      return;
    }
    setShowModal(false);
    // Settinga timeout as we are performing animations on the modal, and that would roughly take 300ms
    onClose();
  }, [disabled, onClose]);
  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <div
      className={`justify-center items-center backdrop-blur flex fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-800/70 `}
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* {CONTENT} */}
        <div
          className={`h-full ${
            showModal ? `tranzinc-y-0` : `tranzinc-y-full`
          } ${showModal ? `opacity-100` : `opacity-0`}`}
        >
          <div className="tranzinc h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-950 outline-none focus:outline-none">
            {/* {HEADER} */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-zinc-500 border-opacity-50 border-b-[1px]">
              <div className="text-xl text-center font-bold">{title}</div>
              <button className="p-1 border-0 hover:opacity-70 transition absolute right-6 text-zinc-400 hover:text-white inline-flex appearance-none items-center justify-center rounded-full focus-outline-null">
                <IoMdClose size={18} onClick={() => onClose()} />
              </button>
            </div>
            <div className="relative p-6 pb-0 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 p-6 pb-0">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    className={buttonVariants({
                      variant: "ghost",
                    })}
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
                <Button
                  disabled={disabled || isLoading}
                  onClick={handleSubmit}
                  className={buttonVariants({
                    variant: "special",
                    className: "w-full p-7 text-lg",
                  })}
                >
                  {isLoading ? (
                    <div className="animate-spin">
                      <AiOutlineLoading />
                    </div>
                  ) : (
                    actionLabel
                  )}
                </Button>
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
