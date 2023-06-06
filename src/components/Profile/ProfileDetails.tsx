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
    <div className="flex flex-col gap-2 h-full md:rounded-bl-2xl">
      <div className="p-5 md:p-0 px-4 md:px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-sm text-zinc-100 shadow-lg">
        <Typography className="font-semibold">{name}</Typography>
      </div>
      <div className="p-5 md:p-0 px-4 md:px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-sm text-zinc-100 shadow-lg">
        <Typography className="font-semibold">{email}</Typography>
      </div>
      <div className="p-5 md:p-0 px-4 md:px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-sm text-zinc-100 shadow-lg">
        <Typography className="font-semibold">Joined on {joinedOn}</Typography>
      </div>
      <div className="p-5 md:p-0 px-4 md:px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-sm text-zinc-100 shadow-lg rounded-b-2xl md:rounded-bl-2xl md:rounded-br-sm">
        <div className="font-semibold">
          {optimizations} Optimization{optimizations !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
