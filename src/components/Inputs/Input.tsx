"use client";

import { FC, Fragment } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  id: string;
  label: string;
  minLength?: number;
}

const Input: FC<InputProps> = ({
  id,
  label,
  required,
  formatPrice,
  disabled,
  type = "text",
  register,
  errors,
  minLength,
}) => {
  return (
    <Fragment>
      <div className="relative w-full">
        {formatPrice && (
          <BiDollar size={24} className="absolute left-2 top-5 text-zinc-700" />
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required: true, minLength: minLength })}
          placeholder=" "
          type={type}
          className={`peer w-full rounded-md border-2 border-zinc-500 border-opacity-50 bg-zinc-900 p-4 pt-6 font-light shadow-sm outline-none transition focus:shadow-md disabled:cursor-not-allowed disabled:opacity-70
        ${formatPrice ? `pl-9` : `pl-4`}
        ${errors[id] ? `border-rose-500` : `border-zinc-300`}
        ${errors[id] ? `focus:border-rose-500` : `focus:border-zinc-600`}
        `}
          required={required}
        />
        <label
          className={`text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150 ${
            formatPrice ? `left-9` : `left-4`
          } 
        peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
        peer-focus:-translate-y-4
        peer-focus:scale-75
        ${errors[id] ? `text-rose-500` : `text-zinc-400`}
        `}
        >
          {label}
        </label>
      </div>
      {type === "password" && errors[id] && (
        <div className="mt-[-1rem] text-sm opacity-50">
          The password should be atleast 6 characters long
        </div>
      )}
    </Fragment>
  );
};

export default Input;
