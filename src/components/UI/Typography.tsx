import { FC, HTMLAttributes, ReactNode } from "react";
import mergeClasses from "@/utils/mergeClasses";
import Link from "next/link";

interface TypographyProps
  extends HTMLAttributes<
    HTMLParagraphElement | HTMLHeadingElement | HTMLDivElement | HTMLLinkElement
  > {
  type?:
    | "heading"
    | "subheading"
    | "paragraph"
    | "email"
    | "link"
    | "special"
    | "lightweight";
  email?: string;
  href?: string;
  children: ReactNode;
}

const Typography: FC<TypographyProps> = ({
  type,
  children,
  className,
  email,
  href,
}) => {
  switch (type) {
    case "heading":
      return (
        <h1 className={mergeClasses("text-2xl font-extrabold", className)}>
          {children}
        </h1>
      );
    case "subheading":
      return (
        <h3 className={mergeClasses("text-xl  font-bold", className)}>
          {children}
        </h3>
      );
    case "paragraph":
      return <p className={mergeClasses("text-lg", className)}>{children}</p>;
    case "email":
      return (
        <Link
          href={`mailto:${email!}`}
          className={mergeClasses(
            "underline text-zinc-200 my-0 inline-block mx-1",
            className
          )}
        >
          {children}
        </Link>
      );
    case "link":
      return (
        <Link
          href={href!}
          className={mergeClasses(
            "underline text-zinc-200 my-0 inline-block mx-1",
            className
          )}
        >
          {children}
        </Link>
      );
    case "lightweight":
      return (
        <span
          className={mergeClasses(
            "font-light text-zinc-200 inline-block",
            className
          )}
        >
          {children}
        </span>
      );
    case "special":
      return (
        <span className={mergeClasses("text-zinc-200 inline-block", className)}>
          {children}
        </span>
      );
    default:
      return <div className={mergeClasses(className)}>{children}</div>;
  }
};

export default Typography;
