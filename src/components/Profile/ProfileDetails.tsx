import { FC, Fragment, useMemo } from "react";
import Typography from "../UI/Typography";

interface ProfileDetails {
  name?: string | null;
  email?: string | null;
  optimizations: number;
}

const ProfileDetails: FC<ProfileDetails> = (data) => {
  const formatOptimization = (value: number) =>
    value === 0 ? "No Optimizations" : `${value} Optimization(s) so far`;
  const container = (value: string | number, index: number) => {
    return (
      <div
        className={`p-5 md:px-5 bg-zinc-800/50 h-full flex justify-left items-center rounded-sm text-zinc-100 shadow-lg ${
          Number.isInteger(value) &&
          "rounded-b-2xl md:rounded-bl-2xl md:rounded-br-sm"
        }`}
        key={index}
      >
        <div className="font-semibold">
          {Number.isInteger(value) ? formatOptimization(Number(value)) : value}
        </div>
      </div>
    );
  };
  const userData = Object.values(data).map((value, index) =>
    container(value, index)
  );
  return <Fragment>{userData}</Fragment>;
};

export default ProfileDetails;
