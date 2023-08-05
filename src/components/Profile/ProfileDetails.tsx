import React, { FC } from "react";

import Typography from "../UI/Typography";

interface ProfileDetailsProps {
  name?: string | null;
  email?: string | null;
  optimizations: number;
  joinedOn: string | undefined;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
  name,
  email,
  optimizations,
  joinedOn,
}) => {
  return (
    <div className="flex h-full flex-col gap-2 md:rounded-bl-2xl">
      <div className="justify-left flex h-full items-center rounded-sm bg-zinc-800/50 p-5 px-4 text-zinc-100 shadow-lg md:p-0 md:px-5">
        <Typography className="font-semibold">{name}</Typography>
      </div>
      <div className="justify-left flex h-full items-center rounded-sm bg-zinc-800/50 p-5 px-4 text-zinc-100 shadow-lg md:p-0 md:px-5">
        <Typography className="font-semibold">{email}</Typography>
      </div>
      <div className="justify-left flex h-full items-center rounded-sm bg-zinc-800/50 p-5 px-4 text-zinc-100 shadow-lg md:p-0 md:px-5">
        <Typography className="font-semibold">Joined on {joinedOn}</Typography>
      </div>
      <div className="justify-left flex h-full items-center rounded-sm rounded-b-2xl bg-zinc-800/50 p-5 px-4 text-zinc-100 shadow-lg md:rounded-bl-2xl md:rounded-br-sm md:p-0 md:px-5">
        <div className="font-semibold">
          {optimizations} Optimization{optimizations !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
