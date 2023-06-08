import Navbar from "./Navbar";
import { siteConfiguration } from "@/config";
import NavItem from "./Navitem";

import { FaLinkedin } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types/User";
import { FC } from "react";

interface HeaderProps {
  currentUser: SafeUser | null;
}

const Header: FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-zinc-700 bg-zinc-950">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Navbar items={siteConfiguration.items} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <NavItem
              href={siteConfiguration.links.github}
              icon={GoMarkGithub}
              label="Github"
            />
            <NavItem
              href={siteConfiguration.links.linkedin}
              icon={FaLinkedin}
              label="LinkedIn"
            />
            <UserMenu currentUser={currentUser} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
