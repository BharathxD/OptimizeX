import Link from "next/link";

import { FaLinkedin } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";

import Navbar from "./Navbar";
import { buttonVariants } from "../UI/Button";
import siteConfiguration from "@/config";
import NavItem from "./Navitem";
import { Fragment } from "react";

const Header = () => {
  return (
      <header className="sticky top-0 z-40 w-full border-b border-b-zinc-200 bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Navbar items={siteConfiguration.items} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <NavItem
                href={siteConfiguration.links.github}
                icon={GoMarkGithub}
              />
              <NavItem
                href={siteConfiguration.links.linkedin}
                icon={FaLinkedin}
              />
            </nav>
          </div>
        </div>
      </header>
  );
};

export default Header;
