import { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";
import getUserOptimizations from "@/actions/getUserOptimizations";

import Profile from "@/components/Profile/Profile";
import ProfileDetails from "@/components/Profile/ProfileDetails";
import UserOptimizations from "@/components/Profile/UserOptimizations";

export const generateMetadata = async (): Promise<Metadata> => {
  const currentUser = await getCurrentUser();
  const title = `${currentUser?.name}'s Optimizations`;
  return { title };
};

const OptimizationsPage = async () => {
  const currentUser = await getCurrentUser();
  const optimizations = await getUserOptimizations();
  return (
    <div className="no-scrollbar container grid grid-cols-1 grid-rows-2 gap-0 overflow-hidden overflow-y-scroll py-4 md:min-h-[82vh] md:grid-cols-4 md:grid-rows-1 md:gap-2">
      <div className="mb-4 flex w-full flex-col gap-2 overflow-y-scroll md:mb-0">
        <div className="flex aspect-square h-fit items-center justify-center rounded-2xl rounded-b-sm rounded-bl-sm bg-zinc-800/50 p-4 shadow-lg md:rounded-r-sm">
          <Profile src={currentUser?.image} />
        </div>
        <ProfileDetails
          name={currentUser?.name}
          email={currentUser?.email}
          optimizations={Number(currentUser?.optimizedImages.length)}
          joinedOn={currentUser?.createdAt}
        />
      </div>
      <div className="col-span-3 flex flex-col gap-2 overflow-scroll rounded-2xl rounded-t-2xl md:rounded-l-sm">
        <UserOptimizations optimizations={optimizations} />
      </div>
    </div>
  );
};

export default OptimizationsPage;
