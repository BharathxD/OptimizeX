import { FC, Fragment, useMemo } from "react";

interface ProfileDetails {
  name?: string | null;
  email?: string | null;
  optimizations: number;
}

const ProfileDetails: FC<ProfileDetails> = (data) => {
  const formatOptimization = (value: number) =>
    value === 0 ? "No Optimizations" : `${value} Optimizations so far`;
  const container = (value: string | number) => {
    return (
      <div className="px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-lg text-zinc-100 font-semibold shadow-lg">
        {Number.isInteger(value) ? formatOptimization(Number(value)) : value}
      </div>
    );
  };
  const userData = Object.values(data).map((value) => container(value));
  return <Fragment>{userData}</Fragment>;
};

export default ProfileDetails;
