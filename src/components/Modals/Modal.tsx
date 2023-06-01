"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Button, buttonVariants } from "../Inputs/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
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
      className={`justify-center items-center backdrop-blur flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-800/70`}
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
        onClick={(event) => event.stopPropagation()}
      >
        {/* {CONTENT} */}
        <div
          className={`h-full ${
            showModal ? `translate-y-0` : `translate-y-full`
          } ${showModal ? `opacity-100` : `opacity-0`}`}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-900 outline-none focus:outline-none">
            {/* {HEADER} */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button className="p-1 border-0 hover:opacity-70 transition absolute left-6">
                Close
              </button>
              <div className="text-lg font-semibold">{title}</div>
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
                  disabled={disabled}
                  onClick={handleSubmit}
                  className={buttonVariants({
                    variant: "special",
                    className: "w-full p-7"
                  })}
                >
                  {actionLabel}
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
