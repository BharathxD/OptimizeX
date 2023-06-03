import { FC, ReactNode } from "react";

interface LiabilitiesWrapper {
  children: ReactNode;
}

const LiabilitiesPageWrapper: FC<LiabilitiesWrapper> = ({ children }) => {
  return (
    <div className="container grid items-center gap-1 py-4 h-screen md:h-[82vh] overflow-y-auto md:w-[50%] no-scrollbar">
      <div className="h-full flex flex-col gap-4">{children}</div>
    </div>
  );
};

export default LiabilitiesPageWrapper;
