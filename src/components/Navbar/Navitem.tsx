import Link from "next/link";
import { buttonVariants } from "../UI/Button";
import { IconType } from "react-icons";

interface NavItemProps {
  href: string;
  icon: IconType;
}

const NavItem = ({ href, icon: Icon }: NavItemProps) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <div
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className: "",
        })}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </div>
    </Link>
  );
};

export default NavItem;
