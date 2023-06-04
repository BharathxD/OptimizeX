"use client";

import { FC, Fragment, useState } from "react";
import Avatar from "./Avatar";

interface ProfileProps {
  src?: string | null;
}

const Profile: FC<ProfileProps> = ({ src }) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  return (
    <Fragment>
      {src ? (
        <div className="h-full w-full relative">
          <div
            className={`absolute flex justify-center items-center h-full bg-transparent w-full ${
              isBlurred && "backdrop-blur-lg backdrop-brightness-50"
            } rounded-full z-9`}
          >
            {isBlurred && (
              <div className="absolute z-10 text-zinc-300">
                <div
                  className="bg-zinc-600/25 p-2 rounded-lg border border-zinc-500/50 text-center text-md cursor-pointer"
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
        <div className="flex text-zinc-500 items-center justify-center h-[25rem] w-full rounded-full bg-zinc-800/50">
          You have no profile picture
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
