import { FC, Fragment } from "react";

interface ProfileDetails {
  name?: string | null;
  email?: string | null;
  optimizations: number;
}

const ProfileDetails: FC<ProfileDetails> = (data) => {
  const container = (value: string | number) => {
    return (
      <div className="px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-lg text-zinc-100 font-semibold shadow-lg">
        {value} {Number.isInteger(value) && "optimizations so far"}
      </div>
    );
  };
  return (
    <Fragment>{Object.values(data).map((value) => container(value))}</Fragment>
  );
};

export default ProfileDetails;
