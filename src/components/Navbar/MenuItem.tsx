"use client";

import { FC } from "react";

interface MenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  bold?: boolean;
}

const MenuItem: FC<MenuItem> = ({ label, onClick, bold, disabled }) => {
  const onClickHandler = () => {
    if (disabled) return;
    return onClick();
  };
  return (
    <div
      onClick={onClickHandler}
      className={`px-4 py-3 cursor-pointer hover:bg-sinc-100 hover:text-zinc-400 transistion ${
        bold ? "font-bold" : "font-semibold-400"
      } ${disabled && "bg-sinc-300 hover:bg-sinc-300 cursor-not-allowed"}`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
