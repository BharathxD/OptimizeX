"use client";

import { FC } from "react";
import { MoonLoader } from "react-spinners";

interface MenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  bold?: boolean;
  isLoading?: boolean;
}

const MenuItem: FC<MenuItem> = ({
  label,
  onClick,
  bold,
  disabled,
  isLoading,
}) => {
  const onClickHandler = () => {
    if (disabled) return;
    return onClick();
  };
  return (
    <button
      onClick={onClickHandler}
      className={`flex justify-end flex-row px-4 py-2.5 cursor-pointer hover:bg-sinc-100 hover:text-zinc-400 transistion ${
        bold ? "font-bold" : "font-semibold-400"
      } ${
        disabled && "bg-sinc-300 hover:bg-sinc-300 hover:cursor-not-allowed"
      }`}
      disabled={isLoading}
    >
      {!isLoading ? (
        <div>{label}</div>
      ) : (
        <MoonLoader size={15} speedMultiplier={0.75} color="white" />
      )}
    </button>
  );
};

export default MenuItem;
