import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import mergeClasses from "@/utils";
import { IconType } from "react-icons";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors gap-3 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 disabled:opacity-50 dark:focus:ring-zinc-400 disabled:pointer-events-none dark:focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-black hover:bg-zinc-400 hover:dark:bg-zinc-200 hover:dark:text-zinc-700 dark:bg-zinc-100 dark:text-zinc-900",
        special:
          "bg-zinc-100 text-white hover:bg-zinc-700 hover:dark:bg-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-500 border-opacity-50",
        destructive:
          "bg-zinc-500 text-white hover:bg-zinc-600 dark:hover:bg-zinc-600",
        outline:
          "bg-transparent dark:bg-zinc-900 border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100",
        subtle:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-100",
        ghost:
          "bg-transparent dark:bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:hover:text-zinc-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-300 hover:bg-transparent dark:hover:bg-transparent",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, icon: Icon, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={mergeClasses(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={mergeClasses(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {Icon && <Icon />}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
