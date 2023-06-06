import Link from "next/link";
import { Button, buttonVariants } from "../Inputs/Button";
import { IconType } from "react-icons";

interface NavItemProps {
  href: string;
  icon: IconType;
}

const NavItem = ({ href, icon: Icon }: NavItemProps) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Button
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className: "",
        })}
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </Button>
    </Link>
  );
};

export default NavItem;
