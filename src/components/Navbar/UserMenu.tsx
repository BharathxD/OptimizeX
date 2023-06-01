"use client";

import { SafeUser } from "@/types/User";
import Avatar from "../UI/Avatar";
import { FC, useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className={`ml-4 p-1 md:p-4 md:py-1 md:px-1 border-[1px] hover:border-zinc-600 hover:bg-zinc-700 ${
          isOpen ? "border-zinc-600 bg-zinc-700" : "border-zinc-700 bg-zinc-800"
        } flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition`}
      >
        <div>
          {currentUser ? (
            <Avatar src={currentUser?.image} />
          ) : (
            <div>
              <BiMenu size={25} />
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-3 xl:mt-2 max-w-screen-sm rounded-xl shadow-md w-[40vw] md:w-min bg-zinc-800 overflow-hidden right-0 text-sm border-[1px] border-zinc-600">
          {currentUser ? (
            <div>
              <MenuItem
                onClick={() => {
                  signOut();
                }}
                label="Logout"
              />
            </div>
          ) : (
            <div>
              <MenuItem
                onClick={() => {
                  loginModal.onOpen();
                }}
                label="Login"
              />
              <MenuItem
                onClick={() => {
                  registerModal.onOpen();
                }}
                label="Register"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
