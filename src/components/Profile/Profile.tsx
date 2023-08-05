"use client";

import { FC, Fragment, useState } from "react";

import Avatar from "../UI/Avatar";

interface ProfileProps {
  src?: string | null;
}

const Profile: FC<ProfileProps> = ({ src }) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  return (
    <Fragment>
      {src ? (
        <div className="relative aspect-square h-min w-full">
          <div
            className={`absolute flex h-full w-full items-center justify-center bg-transparent ${
              isBlurred && "backdrop-blur-lg backdrop-brightness-50"
            } z-9 rounded-full`}
          >
            {isBlurred && (
              <div className="absolute z-10 text-zinc-300">
                <div
                  className="text-md cursor-pointer rounded-lg border border-zinc-500/50 bg-zinc-600/25 p-2 text-center"
                  onClick={() => setIsBlurred(false)}
                >
                  Click to Unblur
                </div>
              </div>
            )}
          </div>
          <Avatar
            className="h-full w-full border-2 border-zinc-800/50"
            src={src}
          />
        </div>
      ) : (
        <div className="flex aspect-square h-auto w-auto items-center justify-center rounded-full bg-zinc-800/50 p-10 text-zinc-500">
          You have no profile picture
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
