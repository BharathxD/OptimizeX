import { FC, ReactNode } from "react";

interface LiabilitiesWrapper {
  children: ReactNode;
}

const LiabilitiesPageWrapper: FC<LiabilitiesWrapper> = ({ children }) => {
  return (
    <div className="no-scrollbar container grid h-screen items-center gap-1 overflow-y-auto py-4 md:h-[82vh] md:w-[50%]">
      <div className="flex h-full flex-col gap-4">{children}</div>
    </div>
  );
};

export default LiabilitiesPageWrapper;
