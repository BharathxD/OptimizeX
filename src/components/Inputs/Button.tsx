import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import mergeClasses from "@/utils/mergeClasses";
import { IconType } from "react-icons";
import { MoonLoader } from "react-spinners";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors gap-3 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50 focus:ring-zinc-400 disabled:pointer-events-none focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-800",
  {
    variants: {
      variant: {
        default:
          "hover:bg-zinc-400 hover:bg-zinc-200 hover:text-zinc-700 bg-zinc-100 text-zinc-900",
        special:
          "hover:bg-zinc-700 hover:bg-zinc-700 bg-zinc-900 text-zinc-100 border border-zinc-700",
        destructive: "hover:bg-zinc-600",
        outline:
          "bg-zinc-950 border border-zinc-200 hover:bg-zinc-800 border-zinc-700 text-zinc-100",
        subtle: "hover:bg-zinc-200 bg-zinc-700 text-zinc-100",
        ghost:
          "bg-transparent hover:bg-zinc-800 text-zinc-100 hover:text-zinc-100 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-zinc-300 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        md: "h-10 px-6 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: IconType;
  newTab?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      children,
      href,
      variant,
      size,
      newTab,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    if (href) {
      return (
        <Link
          href={href}
          aria-label="Link"
          className={mergeClasses(buttonVariants({ variant, size, className }))}
          {...(newTab && { target: "_blank", rel: "noreferrer" })}
        >
          {children}
          {Icon && <Icon />}
        </Link>
      );
    }
    return (
      <button
        className={mergeClasses(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!isLoading ? (
          <>
            {children}
            {Icon && <Icon />}
          </>
        ) : (
          <MoonLoader size={15} speedMultiplier={0.75} color="white" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
