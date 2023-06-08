import Link from "next/link";
import { Button, buttonVariants } from "../Inputs/Button";
import { IconType } from "react-icons";

interface NavItemProps {
  href: string;
  icon: IconType;
  label: string;
}

const NavItem = ({ href, label, icon: Icon }: NavItemProps) => {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <Button
        aria-label={label}
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className:
            "text-zinc-200 rounded-full hover:bg-gradient-to-br hover:from-zinc-200/10 hover:to-zinc-400/10",
        })}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default NavItem;
