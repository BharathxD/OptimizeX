import Link from "next/link";

import { NavItem } from "@/types/Navigation";

import { Button, buttonVariants } from "../Inputs/Button";

interface NavbarProps {
  items: NavItem[];
}

const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href="/"
        className="flex items-center justify-center space-x-2 md:flex"
      >
        <span className="relative text-2xl font-extrabold sm:inline-block">
          OptimizeX
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden md:block">
          {items?.map(
            (item, index) =>
              item.href && (
                <Button
                  key={index}
                  href={item.href}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {item.title}
                </Button>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
};

export default Navbar;
