import { FC, HTMLAttributes, ReactNode } from "react";
import mergeClasses from "@/utils";
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
        <h1 className={mergeClasses(className, "text-2xl font-extrabold")}>
          {children}
        </h1>
      );
    case "subheading":
      return (
        <h3 className={mergeClasses(className, "text-xl  font-bold")}>
          {children}
        </h3>
      );
    case "paragraph":
      return <p className={mergeClasses(className, "text-lg")}>{children}</p>;
    case "email":
      return (
        <Link
          href={`mailto:${email!}`}
          className=" underline text-zinc-200 my-0 inline-block mx-1"
        >
          {children}
        </Link>
      );
    case "link":
      return (
        <Link
          href={href!}
          className="underline text-zinc-200 my-0 inline-block mx-1"
        >
          {children}
        </Link>
      );
    case "lightweight":
      return (
        <span className="font-light text-zinc-200 inline-block">
          {children}
        </span>
      );
    case "special":
      return <span className="text-zinc-200 inline-block">{children}</span>;
    default:
      return <div className={mergeClasses(className)}>{children}</div>;
  }
};

export default Typography;
