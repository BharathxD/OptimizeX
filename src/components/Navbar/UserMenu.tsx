"use client";

import { FC, Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { useMutation } from "react-query";

import { SafeUser } from "@/types/User";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Avatar from "../UI/Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const menuRef = useRef<HTMLDivElement>(null);

  const { isLoading, mutate: logOut } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => router.refresh(),
  });

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
        className={`ml-4 border-[1px] bg-zinc-700 p-1 hover:border-zinc-600 md:p-4 md:px-1 md:py-1 ${
          isOpen
            ? "border-zinc-700 bg-zinc-800 bg-gradient-to-tl from-zinc-700 to-zinc-900"
            : "border-zinc-700 bg-zinc-900 bg-gradient-to-br from-zinc-700 to-zinc-900"
        } flex cursor-pointer flex-row items-center gap-3 rounded-full transition hover:bg-gradient-to-tr hover:from-zinc-700 hover:to-zinc-900 hover:shadow-md`}
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
          className="absolute right-0 mt-3 w-[40vw] max-w-screen-sm overflow-hidden rounded-xl border-[1px] border-zinc-600 bg-zinc-900 py-1 text-sm shadow-md md:w-min xl:mt-2"
        >
          {currentUser ? (
            <Fragment>
              <div className="pb-1">
                <MenuItem onClick={() => router.push("/")} label="Home" />
                <MenuItem
                  onClick={() => router.push("/optimizations")}
                  label="Optimizations"
                />
              </div>
              <div className="mt-1 h-[1px] w-full bg-zinc-600"></div>
              <MenuItem onClick={logOut} isLoading={isLoading} label="Logout" />
            </Fragment>
          ) : (
            <Fragment>
              <MenuItem
                onClick={() => {
                  loginModal.onOpen();
                }}
                label="Login"
              />
              <div className="h-[1px] w-full bg-zinc-600"></div>
              <MenuItem
                onClick={() => {
                  registerModal.onOpen();
                }}
                label="Register"
              />
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
