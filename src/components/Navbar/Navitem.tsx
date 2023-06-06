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
          className: "text-zinc-200",
        })}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default NavItem;
