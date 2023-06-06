"use client";

import { SafeUser } from "@/types/User";
import Avatar from "../UI/Avatar";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Check if the menuRef exists and if the clicked target is outside the menuRef
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup by removing the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className={`ml-4 p-1 md:p-4 md:py-1 md:px-1 border-[1px] hover:border-zinc-600 bg-zinc-700 ${
          isOpen
            ? "border-zinc-700 bg-zinc-800 bg-gradient-to-tl from-zinc-700 to-zinc-900"
            : "border-zinc-700 bg-zinc-900 bg-gradient-to-br from-zinc-700 to-zinc-900"
        } flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition`}
      >
        <div>
          {currentUser ? (
            <Avatar src={currentUser?.image} name={currentUser.name} />
          ) : (
            <div>
              <BiMenu size={25} />
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute mt-3 xl:mt-2 max-w-screen-sm rounded-xl shadow-md w-[40vw] md:w-min bg-zinc-900 overflow-hidden right-0 text-sm border-[1px] border-zinc-600"
        >
          {currentUser ? (
            <div>
              <MenuItem
                onClick={() => {
                  router.push("/optimizations");
                }}
                label="Optimizations"
              />
              <div className="w-full bg-zinc-600 h-[1px]"></div>
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
              <div className="w-full bg-zinc-600 h-[1px]"></div>
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
