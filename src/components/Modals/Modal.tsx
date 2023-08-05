"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

import { Button, buttonVariants } from "../Inputs/Button";

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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-800/70 outline-none backdrop-blur focus:outline-none `}
      onClick={handleClose}
    >
      <div
        className="relative mx-auto my-6 h-full w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5"
        onClick={(event) => event.stopPropagation()}
      >
        {/* {CONTENT} */}
        <div
          className={`h-full ${
            showModal ? `tranzinc-y-0` : `tranzinc-y-full`
          } ${showModal ? `opacity-100` : `opacity-0`}`}
        >
          <div className="tranzinc relative flex h-full w-full flex-col rounded-lg border-0 bg-zinc-950 shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
            {/* {HEADER} */}
            <div className="relative flex items-center justify-center rounded-t border-b-[1px] border-zinc-500 border-opacity-50 p-6">
              <div className="text-center text-xl font-bold">{title}</div>
              <button className="focus-outline-null absolute right-6 inline-flex appearance-none items-center justify-center rounded-full border-0 p-1 text-zinc-400 transition hover:text-white hover:opacity-70">
                <IoMdClose size={18} onClick={() => onClose()} />
              </button>
            </div>
            <div className="relative flex-auto p-6 pb-0">{body}</div>
            <div className="flex flex-col gap-2 p-6 pb-0">
              <div className="flex w-full flex-row items-center gap-4">
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
