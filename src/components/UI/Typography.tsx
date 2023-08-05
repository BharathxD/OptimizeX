import { FC, HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import mergeClasses from "@/utils/mergeClasses";

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
            "mx-1 my-0 inline-block text-zinc-200 underline",
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
            "mx-1 my-0 inline-block text-zinc-200 underline",
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
            "inline-block font-light text-zinc-200",
            className
          )}
        >
          {children}
        </span>
      );
    case "special":
      return (
        <span className={mergeClasses("inline-block text-zinc-200", className)}>
          {children}
        </span>
      );
    default:
      return <div className={mergeClasses(className)}>{children}</div>;
  }
};

export default Typography;
